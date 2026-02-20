import { reviews } from "@/lib/data";
import ReviewCard from "../dashboard/ReviewCard";

export default function Testimonial() {
  const featuredReviews = reviews.slice(0, 3);
  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="max-w-6xl px-5 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What Our Students Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from students who transformed
            their learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((review, index) => (
            <div
              key={review.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
