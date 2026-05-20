import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { getProduct, CATEGORY_LABEL, type Product } from "../../services/productsService";
import { useCart } from "../../contexts/cart/useCart";
import { useAuth } from "../../contexts/auth/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setNotFound(false);
    getProduct(id)
      .then((p) => {
        setProduct(p);
        setSelectedSize(p.sizes[0] ?? null);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 px-margin-desktop text-on-surface-variant">
        Loading product…
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="pt-32 px-margin-desktop text-on-surface">
        Product not found.
      </div>
    );
  }

  const handleAdd = async () => {
    setFeedback(null);
    if (!user) {
      navigate("/login");
      return;
    }
    if (!selectedSize) {
      setFeedback("Pick a size first.");
      return;
    }
    setAdding(true);
    try {
      await addItem(product.id, selectedSize, 1);
      setFeedback("Added to cart!");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-margin-desktop bg-background min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="text-primary-container font-label-bold uppercase text-xs mb-8 flex items-center gap-2 cursor-pointer"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7">
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-surface-container-highest">
            {product.image_url && (
              <img
                src={product.image_url}
                className="w-full h-full object-cover"
                alt={product.name}
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <header>
            <p className="text-xs uppercase tracking-widest font-label-bold text-on-surface-variant">
              {product.brand} · {CATEGORY_LABEL[product.category]}
            </p>
            <h1 className="font-headline-xl text-6xl text-on-surface uppercase italic leading-none mt-2">
              {product.name}
            </h1>
            <p className="font-headline-lg text-3xl text-primary mt-4">
              ${Number(product.price).toFixed(2)}
            </p>
          </header>

          {product.description && (
            <div className="pt-8 border-t border-outline-variant/30 space-y-4">
              <h3 className="font-label-bold text-on-surface uppercase tracking-widest text-sm">
                Description
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-label-bold text-on-surface uppercase tracking-widest text-sm">
              Select Size
            </h3>
            {product.sizes.length === 0 ? (
              <p className="text-on-surface-variant text-sm">
                No sizes available for this product.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border-2 font-bold transition-all cursor-pointer ${
                      selectedSize === size
                        ? "border-primary-container bg-primary-container text-white"
                        : "border-outline-variant text-on-surface hover:border-primary-container"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {product.stock <= 0 ? (
            <p className="text-primary-container font-label-bold uppercase tracking-widest text-sm">
              Sold out
            </p>
          ) : (
            <p className="text-on-surface-variant text-sm">
              {product.stock} in stock
            </p>
          )}

          <button
            onClick={handleAdd}
            disabled={adding || product.stock <= 0 || product.sizes.length === 0}
            className="w-full bg-primary-container text-white py-5 font-headline-lg uppercase italic shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
          >
            {adding ? "Adding…" : "Add to Cart"} <MdShoppingBag size={24} />
          </button>

          {feedback && (
            <p
              className={`text-sm font-label-bold ${
                feedback.startsWith("Added")
                  ? "text-primary"
                  : "text-primary-container"
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
