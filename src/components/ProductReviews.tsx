
import { useState, useEffect } from 'react';
import { Star, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface Review {
  id: string;
  product_id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ProductReviewsProps {
  productId: number;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to submit a review",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          { 
            product_id: productId, 
            user_name: userName, 
            rating, 
            comment 
          }
        ]);

      if (error) throw error;
      
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!"
      });
      
      // Reset form
      setUserName('');
      setRating(5);
      setComment('');
      setShowForm(false);
      
      // Refresh reviews
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Submission error",
        description: "There was a problem submitting your review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button 
          variant="outline" 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Write a Review
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`h-6 w-6 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium mb-1">
                    Your Review
                  </label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Share your experience with this product..."
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-navy hover:bg-navy/90"
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-8">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                {renderStars(Math.round(calculateAverageRating()))}
              </div>
              <span className="text-lg font-medium">
                {calculateAverageRating().toFixed(1)} out of 5
              </span>
              <span className="text-gray-500 ml-3">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{review.user_name}</div>
                <div className="text-gray-500 text-sm">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="flex mb-2">
                {renderStars(review.rating)}
              </div>
              {review.comment && <p className="text-gray-700">{review.comment}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No reviews yet. Be the first to review this product!
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
