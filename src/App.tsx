import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, Search, Calendar, Sparkles, MessageCircle, 
  X, Check, ChevronRight, ChevronLeft, Star, ShieldCheck, Truck, 
  User, Menu, Phone, ExternalLink, ArrowRight,
  Clock, MapPin, Camera, CheckCircle2, Mail, Share2, Instagram,
  HelpCircle, RefreshCw, Heart, Shield, Plus, Trash2, Edit3, Maximize2, Minimize2
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'Face' | 'Lips' | 'Eyes' | 'Palettes';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  shades: string[];
  ingredients: string;
}

interface CartItem extends Product {
  selectedShade: string;
  quantity: number;
}

interface ConsultationService {
  id: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  image: string;
}

interface Testimonial {
  id: string;
  name: string;
  service: string;
  comment: string;
  rating: number;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Nneka Obi',
    service: 'Bridal Makeover',
    comment: 'Gift Gami did my bridal makeup for my traditional wedding in Asokoro, and I received endless compliments from morning till night! Flawless application and so professional.',
    rating: 5,
    location: 'Abuja'
  },
  {
    id: 't2',
    name: 'Amina Lawal',
    service: 'Corporate Event Glam',
    comment: 'The soft glam session at the Guzape studio was breathtaking. My skin looked like porcelain and didn’t budge even through hours of reception dancing!',
    rating: 5,
    location: 'Lekki / Abuja'
  },
  {
    id: 't3',
    name: 'Zainab Aliyu',
    service: 'Birthday Shots Makeover',
    comment: 'Absolute perfection! I booked the mobile home service for my birthday photoshoot and the makeup popped stunningly on camera with zero flashback.',
    rating: 5,
    location: 'Abuja'
  },
  {
    id: 't4',
    name: 'Chiamaka Okoro',
    service: 'Studio Makeup Session',
    comment: 'The best makeup artist in Abuja by far. Clean studio, luxurious products, and warm hospitality. Will definitely be coming back!',
    rating: 5,
    location: 'Asokoro, Abuja'
  }
];

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Gami Glow Silk Fluid Foundation SPF30',
    category: 'Face',
    price: 35000,
    rating: 4.9,
    reviewsCount: 342,
    image: '/assets/aistudio/IMG-20261029-WA0004_f1748943.jpg',
    description: 'A breathable, medium-to-full coverage liquid foundation infused with hyaluronic acid and Vitamin E for a radiant second-skin finish.',
    shades: ['Amber 450', 'Ebony 500', 'Honey 380', 'Café 420', 'Golden Tan 320'],
    ingredients: 'Aqua, Cyclopentasiloxane, Glycerin, Hyaluronic Acid, Vitamin E, Titanium Dioxide, Iron Oxides.'
  },
  {
    id: 'p2',
    name: 'Gami Velvet Matte Lipstick',
    category: 'Lips',
    price: 15000,
    rating: 4.8,
    reviewsCount: 512,
    image: '/assets/aistudio/IMG-20261105-WA0004_4a69d9cd.jpg',
    description: 'Intensely pigmented, weightless matte lipstick delivering up to 12 hours of comfortable, non-drying wear.',
    shades: ['Royal Burgundy', 'Nude Sahara', 'Terracotta Rose', 'Cocoa Kiss', 'Vibrant Coral'],
    ingredients: 'Isododecane, Octyldodecanol, Synthetic Beeswax, Shea Butter, Vitamin E, Silica.'
  },
  {
    id: 'p3',
    name: 'Gami Signature Eyeshadow Palette',
    category: 'Palettes',
    price: 45000,
    rating: 5.0,
    reviewsCount: 289,
    image: '/assets/aistudio/IMG-20261106-WA0006_8701e9ab.jpg',
    description: '18 richly saturated mattes, foils, and dazzling metallic shimmers for high-impact traditional and modern glam.',
    shades: ['Universal Palette (18 shades)'],
    ingredients: 'Mica, Talc, Magnesium Stearate, Squalane, Jojoba Seed Oil, Phenoxyethanol.'
  },
  {
    id: 'p4',
    name: 'Gami Radiant Highlighter Duo',
    category: 'Face',
    price: 25000,
    rating: 4.9,
    reviewsCount: 198,
    image: '/assets/aistudio/IMG-20261105-WA0002_86529d18.jpg',
    description: 'Ultra-fine baked powder highlighter that imparts a lit-from-within molten gold and rose bronze radiance.',
    shades: ['Molten Gold', 'Rose Bronze', 'Champagne Glow'],
    ingredients: 'Synthetic Fluorphlogopite, HDI/Trimethylol Hexyllactone Crosspolymer, Squalane, Tin Oxide.'
  }
];

const CONSULTATION_SERVICES: ConsultationService[] = [
  {
    id: 'c1',
    title: 'Studio Makeup Session',
    duration: '45 Minutes',
    price: 25000,
    description: 'Professional makeup application at our Abuja studio tailored for any occasion.',
    image: '/assets/aistudio/IMG-20261029-WA0003_221be770.jpg'
  },
  {
    id: 'c2',
    title: 'Soft/Full Glam & Natural Glam',
    duration: '60 Minutes',
    price: 35000,
    description: 'Choose between a flawless natural everyday beat or dramatic full glam with premium lashes.',
    image: '/assets/aistudio/IMG-20261105-WA0004_4a69d9cd.jpg'
  },
  {
    id: 'c3',
    title: 'Home Services (Mobile Glam)',
    duration: '90 Minutes',
    price: 60000,
    description: 'We bring the luxury studio experience directly to your doorstep in Abuja.',
    image: '/assets/aistudio/IMG-20261106-WA0006_8701e9ab.jpg'
  },
  {
    id: 'c4',
    title: 'Personal & Corporate Events Makeovers',
    duration: '60 Minutes',
    price: 50000,
    description: 'Look your absolute best for dinners, corporate functions, and red carpet events.',
    image: '/assets/aistudio/IMG-20261105-WA0002_86529d18.jpg'
  },
  {
    id: 'c5',
    title: 'Bridal Makeovers',
    duration: '120 Minutes',
    price: 120000,
    description: 'Bespoke bridal styling for traditional and white weddings with flawless longevity.',
    image: '/assets/aistudio/IMG-20261029-WA0004_f1748943.jpg'
  },
  {
    id: 'c6',
    title: 'Birthday Shots Makeovers',
    duration: '60 Minutes',
    price: 40000,
    description: 'Camera-ready professional makeup designed specifically to pop under photography lighting.',
    image: '/assets/aistudio/IMG-20261105-WA0004_4a69d9cd.jpg'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'shop' | 'gallery' | 'contact' | 'admin'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Face' | 'Lips' | 'Eyes' | 'Palettes'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedShade, setSelectedShade] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string; totalAmount: number; message: string } | null>(null);

  // Storefront CRUD & Orders State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [services, setServices] = useState<ConsultationService[]>(CONSULTATION_SERVICES);
  const [orders, setOrders] = useState<Array<{
    id: string;
    customerName: string;
    type: 'Product Order' | 'Service Booking';
    details: string;
    amount: number;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    date: string;
  }>>([
    { id: 'ORD-9021', customerName: 'Dr. Nneka Obi', type: 'Service Booking', details: 'Bridal Makeover', amount: 120000, status: 'Confirmed', date: '2026-11-06' },
    { id: 'ORD-9022', customerName: 'Amina Lawal', type: 'Product Order', details: 'Gami Glow Silk Fluid Foundation (2x)', amount: 70000, status: 'Completed', date: '2026-11-05' }
  ]);
  const [adminSubTab, setAdminSubTab] = useState<'orders' | 'products' | 'services'>('orders');

  // Lightbox State
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; description?: string } | null>(null);
  const [isLightboxZoomed, setIsLightboxZoomed] = useState(false);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Face' as 'Face' | 'Lips' | 'Eyes' | 'Palettes',
    price: 0,
    description: '',
    image: '/assets/aistudio/IMG-20261029-WA0004_f1748943.jpg',
    shades: 'Amber 450, Ebony 500'
  });

  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ConsultationService | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    duration: '60 Minutes',
    price: 35000,
    description: '',
    image: '/assets/aistudio/IMG-20261029-WA0003_221be770.jpg'
  });

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Shade Finder Quiz State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    depth: '',
    undertone: '',
    skinType: '',
    finish: ''
  });
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Booking state
  const [selectedService, setSelectedService] = useState<ConsultationService | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Testimonial carousel active index
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // WhatsApp widget state
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // Checkout form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '40, Kpaduma II, Guzape, Asokoro - Extension, Abuja',
    city: 'Abuja',
    country: 'Nigeria',
    paymentMethod: 'card'
  });

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: Product, shade: string) => {
    const shadeToUse = shade || product.shades[0];
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedShade === shadeToUse);
      if (existing) {
        return prev.map(item => item.id === product.id && item.selectedShade === shadeToUse 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { ...product, selectedShade: shadeToUse, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, shade: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedShade === shade) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          customer: shippingInfo,
          paymentMethod: shippingInfo.paymentMethod
        })
      });
      const data = await res.json();
      if (data.success) {
        setOrderSuccess(data);
        const newOrderId = data.orderId || 'ORD-' + Math.floor(1000 + Math.random() * 9000);
        setOrders(prev => [{
          id: newOrderId,
          customerName: shippingInfo.fullName || 'Valued Customer',
          type: 'Product Order',
          details: cart.map(i => `${i.name} (${i.quantity})`).join(', '),
          amount: cartTotal,
          status: 'Pending',
          date: new Date().toISOString().split('T')[0]
        }, ...prev]);
        setCart([]);
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert('Checkout error occurred. Please try again.');
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !bookingDate || !clientName) {
      alert('Please fill in all required booking fields.');
      return;
    }
    const refId = 'GG-' + Math.floor(1000 + Math.random() * 9000);
    setBookingSuccess(`Your appointment for "${selectedService.title}" on ${bookingDate} at ${bookingTime} has been successfully booked with Gami Glow Beauty Hub! Reference: ${refId}`);
    setOrders(prev => [{
      id: refId,
      customerName: clientName,
      type: 'Service Booking',
      details: `${selectedService.title} (${bookingDate} at ${bookingTime})`,
      amount: selectedService.price,
      status: 'Confirmed',
      date: new Date().toISOString().split('T')[0]
    }, ...prev]);
  };

  const openWhatsAppPreset = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/2348151295074?text=${encoded}`, '_blank');
  };

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const calculateShadeMatch = () => {
    if (quizAnswers.depth === 'Fair / Light') return 'Golden Tan 320';
    if (quizAnswers.depth === 'Medium / Caramel') return 'Honey 380';
    if (quizAnswers.depth === 'Rich / Deep Bronze') return 'Amber 450';
    return 'Ebony 500';
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* Top Banner Notice */}
      <div className="bg-amber-500 text-stone-950 px-4 py-2 text-xs font-semibold text-center tracking-wide uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        Gami Glow Beauty Hub · Abuja Studio & Home Services · Call / WhatsApp: +234 8151 295 074
      </div>

      {/* Top Bar Contract: 3 Zones */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 px-6 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button 
          onClick={() => setActiveTab('home')}
          className="text-xl font-bold tracking-wider text-amber-500 whitespace-nowrap shrink-0 font-editorial"
        >
          GAMI GLOW
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 ${activeTab === 'home' ? 'text-amber-500 font-semibold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('about')} 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 ${activeTab === 'about' ? 'text-amber-500 font-semibold' : ''}`}
          >
            About Us
          </button>
          <button 
            onClick={() => setActiveTab('services')} 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 ${activeTab === 'services' ? 'text-amber-500 font-semibold' : ''}`}
          >
            Services
          </button>
          <button 
            onClick={() => setActiveTab('shop')} 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 ${activeTab === 'shop' ? 'text-amber-500 font-semibold' : ''}`}
          >
            Shop
          </button>
          <button 
            onClick={() => setActiveTab('gallery')} 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 ${activeTab === 'gallery' ? 'text-amber-500 font-semibold' : ''}`}
          >
            Gallery
          </button>
          <button 
            onClick={() => setActiveTab('contact')} 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 ${activeTab === 'contact' ? 'text-amber-500 font-semibold' : ''}`}
          >
            Contact Us
          </button>
          <button 
            onClick={() => setActiveTab('admin')} 
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-amber-400 flex items-center gap-1.5 ${activeTab === 'admin' ? 'text-amber-500 font-semibold' : 'text-stone-400'}`}
          >
            <Shield className="w-3.5 h-3.5" /> Admin
          </button>
        </nav>

        {/* Zone 3: Primary Action & Cart */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={() => setActiveTab('services')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-500 rounded-md hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Book Now
          </button>
          
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-stone-200 hover:text-amber-400 transition-colors rounded-full bg-stone-900 border border-stone-800"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-stone-200 hover:text-amber-400 transition-colors rounded-full bg-stone-900 border border-stone-800"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('admin')}
            className={`p-2 transition-colors rounded-full border ${activeTab === 'admin' ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-stone-900 text-stone-200 border-stone-800 hover:text-amber-400'}`}
            title="Admin Control Panel"
            aria-label="Admin Control Panel"
          >
            <Shield className="w-5 h-5" />
          </button>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-stone-200 hover:text-amber-400"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <span className="text-lg font-bold text-amber-500 font-editorial">GAMI GLOW</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-100 bg-stone-900 rounded-full"
                aria-label="Close Mobile Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 text-lg font-medium">
              <button 
                onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 border-b border-stone-900 ${activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-stone-300'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 border-b border-stone-900 ${activeTab === 'about' ? 'text-amber-400 font-bold' : 'text-stone-300'}`}
              >
                About Us
              </button>
              <button 
                onClick={() => { setActiveTab('services'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 border-b border-stone-900 ${activeTab === 'services' ? 'text-amber-400 font-bold' : 'text-stone-300'}`}
              >
                Services
              </button>
              <button 
                onClick={() => { setActiveTab('shop'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 border-b border-stone-900 ${activeTab === 'shop' ? 'text-amber-400 font-bold' : 'text-stone-300'}`}
              >
                Shop
              </button>
              <button 
                onClick={() => { setActiveTab('gallery'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 border-b border-stone-900 ${activeTab === 'gallery' ? 'text-amber-400 font-bold' : 'text-stone-300'}`}
              >
                Gallery
              </button>
              <button 
                onClick={() => { setActiveTab('contact'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 border-b border-stone-900 ${activeTab === 'contact' ? 'text-amber-400 font-bold' : 'text-stone-300'}`}
              >
                Contact Us
              </button>
              <button 
                onClick={() => { setActiveTab('admin'); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 border-b border-stone-900 flex items-center gap-2 ${activeTab === 'admin' ? 'text-amber-400 font-bold' : 'text-stone-300'}`}
              >
                <Shield className="w-4 h-4 text-amber-400" /> Admin Control Panel
              </button>
            </nav>
          </div>

          {/* Sticky Book Now Button at bottom of mobile menu */}
          <div className="pt-6 border-t border-stone-800">
            <button 
              onClick={() => { setActiveTab('services'); setIsMobileMenuOpen(false); }}
              className="w-full py-4 bg-amber-500 text-stone-950 font-bold rounded-lg text-sm tracking-wider uppercase shadow-xl shadow-amber-500/20"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* 1. Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6 py-20 bg-stone-950">
              <div className="absolute inset-0 z-0 opacity-45">
                <img 
                  src="/assets/aistudio/IMG-20261106-WA0000_0bd9362a.jpg" 
                  alt="Gami Glow Real Client Makeover" 
                  className="w-full h-full object-cover object-top scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase">
                  <Sparkles className="w-4 h-4" /> Abuja’s Premier Luxury Beauty Hub & Cosmetics
                </div>
                
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial tracking-tight text-stone-100 leading-tight">
                  GAMI GLOW BEAUTY HUB
                </h1>
                
                <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                  Professional makeup artistry and luxury cosmetics in Abuja by Joseph Gift Gami. Specializing in flawless bridal transformations, studio glam, and mobile home services.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('services')}
                    className="px-8 py-4 bg-amber-500 text-stone-950 font-bold rounded-lg hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2 text-sm tracking-wider uppercase"
                  >
                    Book Makeover Session <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('shop')}
                    className="px-8 py-4 bg-stone-900 border border-stone-700 text-stone-200 font-bold rounded-lg hover:bg-stone-800 transition-all text-sm tracking-wider uppercase"
                  >
                    Shop Cosmetics Store
                  </button>
                </div>

                {/* Social Media Connect Bar */}
                <div className="pt-8 flex flex-col items-center justify-center space-y-3">
                  <span className="text-xs uppercase tracking-widest text-stone-400">Follow @josephgiftgami on All Platforms</span>
                  <div className="flex items-center gap-4">
                    <a href="https://instagram.com/josephgiftgami" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-900/90 border border-stone-800 rounded-full hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition-all shadow-md" title="Instagram">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://tiktok.com/@josephgiftgami" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-900/90 border border-stone-800 rounded-full hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition-all shadow-md" title="TikTok">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                    </a>
                    <a href="https://snapchat.com/add/josephgiftgami" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-900/90 border border-stone-800 rounded-full hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition-all shadow-md" title="Snapchat">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.016 2.404c-3.322 0-6.024 2.702-6.024 6.024 0 2.215 1.206 4.148 3.012 5.187-.311.455-.589.96-.807 1.503-.497 1.242-.239 2.651.681 3.491.241.222.544.382.883.475-.487.876-1.399 2.164-3.528 2.316-.367.026-.642.33-.615.698.026.368.33.642.698.615 2.766-.197 4.143-1.897 4.67-2.784.341.07.693.107 1.05.107s.709-.037 1.05-.107c.527.887 1.904 2.587 4.67 2.784.368.027.672-.247.698-.615.027-.368-.248-.672-.615-.698-2.129-.152-3.041-1.44-3.528-2.316.339-.093.642-.253.883-.475.92-.84 1.178-2.249.681-3.491-.218-.543-.496-1.048-.807-1.503 1.806-1.039 3.012-2.972 3.012-5.187 0-3.322-2.702-6.024-6.024-6.024z"/></svg>
                    </a>
                    <a href="https://facebook.com/josephgiftgami" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-900/90 border border-stone-800 rounded-full hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition-all shadow-md" title="Facebook">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.587 9 4.615V8z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Trust & Location Bar */}
            <section className="border-y border-stone-800 bg-stone-900/60 py-10 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="p-3 rounded-full bg-amber-500/10 text-amber-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-stone-200">Abuja Studio Location</h3>
                    <p className="text-xs text-stone-400">40, Kpaduma II, Guzape, Asokoro - Ext.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="p-3 rounded-full bg-amber-500/10 text-amber-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-stone-200">Direct Bookings & WhatsApp</h3>
                    <p className="text-xs text-stone-400">+234 8151 295 074 / +234 80 2532 9410</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="p-3 rounded-full bg-amber-500/10 text-amber-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-stone-200">Verified Professional Artistry</h3>
                    <p className="text-xs text-stone-400">1000+ Satisfied Clients & Brides</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Featured Storefront Best-Sellers */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-6 py-20 space-y-12"
            >
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div>
                  <p className="text-amber-500 text-xs tracking-widest uppercase font-semibold">Luxury Cosmetics</p>
                  <h2 className="text-3xl sm:text-4xl font-editorial tracking-tight text-stone-100">Featured Best-Selling Products</h2>
                </div>
                <button 
                  onClick={() => setActiveTab('shop')}
                  className="px-6 py-2.5 bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-200 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  View Full Storefront <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map(product => (
                  <div key={product.id} className="group bg-stone-900 border border-stone-800 rounded-lg overflow-hidden flex flex-col">
                    <div 
                      onClick={() => setLightboxImage({ src: product.image, title: product.name, description: product.description })}
                      className="relative aspect-[4/5] overflow-hidden bg-stone-950 cursor-pointer"
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-stone-400 mb-1">{product.category}</div>
                        <h3 className="font-semibold text-stone-100 text-base mb-2">{product.name}</h3>
                        <div className="text-sm font-bold text-amber-400 mb-4">₦{product.price.toLocaleString()}</div>
                      </div>
                      <button 
                        onClick={() => { setSelectedProduct(product); setSelectedShade(product.shades[0]); }}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 4. Interactive Shade Finder Quiz Teaser Banner */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-6 py-10"
            >
              <div className="bg-gradient-to-r from-amber-500/20 via-stone-900 to-amber-500/10 border border-amber-500/40 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> 60-Second Matchmaker
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-100">Find Your Perfect Gami Glow Foundation Shade</h3>
                  <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
                    Answer 3 quick questions about your skin tone depth and undertones to instantly discover your precise match in our Silk Fluid Foundation line.
                  </p>
                </div>
                <button 
                  onClick={() => { setActiveTab('shop'); setIsQuizOpen(true); setQuizStep(1); setQuizResult(null); }}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 whitespace-nowrap"
                >
                  Start Shade Finder Quiz
                </button>
              </div>
            </motion.section>

            {/* 5. Signature Makeover & Glam Services Grid */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-6 py-20 space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <p className="text-amber-500 text-xs tracking-widest uppercase font-semibold">Professional Offerings</p>
                <h2 className="text-3xl sm:text-4xl font-editorial tracking-tight text-stone-100">Signature Makeover Services</h2>
                <p className="text-stone-300 text-sm">Choose from our specialized beauty services for your next wedding, dinner, or photoshoot in Abuja.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                  <div key={service.id} className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition-all">
                    <div 
                      onClick={() => setLightboxImage({ src: service.image, title: service.title, description: service.description })}
                      className="relative aspect-[16/9] overflow-hidden cursor-pointer"
                    >
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-amber-400">
                        ₦{service.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-stone-100 text-lg mb-1">{service.title}</h3>
                        <p className="text-xs text-stone-400">{service.description}</p>
                      </div>
                      <button 
                        onClick={() => { setSelectedService(service); setActiveTab('services'); }}
                        className="w-full py-2.5 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 text-xs font-semibold rounded transition-colors"
                      >
                        Book This Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 6. Real Client Work Gallery Highlights */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto px-6 py-12 space-y-12"
            >
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div>
                  <p className="text-amber-500 text-xs tracking-widest uppercase font-semibold">Visual Proof</p>
                  <h2 className="text-3xl sm:text-4xl font-editorial tracking-tight text-stone-100">Recent Real Client Makeovers</h2>
                </div>
                <button 
                  onClick={() => setActiveTab('gallery')}
                  className="px-6 py-2.5 bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-200 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  View Full Gallery <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Traditional Wedding & Event Glam',
                    image: '/assets/aistudio/IMG-20261029-WA0004_f1748943.jpg',
                    desc: 'Flawless gele styling and rich traditional velvet attire makeup.'
                  },
                  {
                    title: 'Executive Studio Portrait',
                    image: '/assets/aistudio/IMG-20261029-WA0003_221be770.jpg',
                    desc: 'Classic professional studio makeover with immaculate skin finish.'
                  },
                  {
                    title: 'Radiant Copper & Yellow Glam',
                    image: '/assets/aistudio/IMG-20261105-WA0004_4a69d9cd.jpg',
                    desc: 'Vibrant photoshoot styling with copper hair and glowing highlights.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden flex flex-col group">
                    <div 
                      onClick={() => setLightboxImage({ src: item.image, title: item.title, description: item.desc })}
                      className="relative aspect-[4/5] overflow-hidden bg-stone-950 cursor-pointer"
                    >
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="font-editorial text-xl font-semibold text-stone-100">{item.title}</h3>
                      <p className="text-xs text-stone-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 7. Client Testimonial Carousel Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-stone-900/40 border-y border-stone-800 py-20 px-6"
            >
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <p className="text-amber-500 text-xs tracking-widest uppercase font-semibold">Client Experiences</p>
                  <h2 className="text-3xl sm:text-4xl font-editorial tracking-tight text-stone-100">Loved by Our Brides & Clients</h2>
                  <p className="text-stone-300 text-sm">Read authentic reviews from clients who trusted Gami Glow Beauty Hub for their special moments.</p>
                </div>

                <div className="relative bg-stone-900 border border-stone-800 p-8 sm:p-12 rounded-2xl shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      {TESTIMONIALS[currentTestimonial].service}
                    </span>
                  </div>

                  <blockquote className="text-lg sm:text-2xl font-editorial italic text-stone-200 mb-8 leading-relaxed">
                    "{TESTIMONIALS[currentTestimonial].comment}"
                  </blockquote>

                  <div className="flex items-center justify-between border-t border-stone-800 pt-6">
                    <div>
                      <div className="font-semibold text-stone-100 text-base">{TESTIMONIALS[currentTestimonial].name}</div>
                      <div className="text-xs text-stone-400">{TESTIMONIALS[currentTestimonial].location}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={prevTestimonial}
                        className="p-2.5 bg-stone-950 border border-stone-800 rounded-full hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
                        aria-label="Previous Testimonial"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={nextTestimonial}
                        className="p-2.5 bg-stone-950 border border-stone-800 rounded-full hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
                        aria-label="Next Testimonial"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Carousel Dots */}
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {TESTIMONIALS.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentTestimonial(idx)}
                        className={`h-2 rounded-full transition-all ${currentTestimonial === idx ? 'w-8 bg-amber-500' : 'w-2 bg-stone-700'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 8. High-Converting WhatsApp & Booking CTA Banner */}
            <section className="bg-gradient-to-t from-stone-900 to-stone-950 py-20 px-6 text-center border-t border-stone-800">
              <div className="max-w-3xl mx-auto space-y-6">
                <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">Get Started Today</span>
                <h2 className="text-3xl sm:text-5xl font-editorial tracking-tight text-stone-100">Ready for Your Gami Glow Transformation?</h2>
                <p className="text-stone-300 text-sm max-w-xl mx-auto">
                  Visit our Abuja studio at 40, Kpaduma II, Guzape, Asokoro Extension, or chat with us instantly on WhatsApp.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('services')}
                    className="px-8 py-4 bg-amber-500 text-stone-950 font-bold rounded-lg hover:bg-amber-400 transition-all text-xs tracking-wider uppercase shadow-xl shadow-amber-500/20"
                  >
                    Book Your Appointment Now
                  </button>
                  <button 
                    onClick={() => openWhatsAppPreset("Hi Gami Glow! I would like to book a makeover appointment.")}
                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all text-xs tracking-wider uppercase inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'about' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto px-6 py-16 space-y-12">
            <div className="text-center space-y-4">
              <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">About Gami Glow</span>
              <h1 className="text-4xl sm:text-5xl font-editorial tracking-tight text-stone-100">Meet Joseph Gift Gami</h1>
              <p className="text-stone-300 text-sm max-w-2xl mx-auto leading-relaxed">
                Founded with a passion for celebrating African beauty, Gami Glow Beauty Hub is Abuja’s premier destination for luxury makeup artistry, bridal makeovers, and immaculate skin finishes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-stone-800">
                <img src="/assets/aistudio/IMG-20261029-WA0004_f1748943.jpg" alt="Gami Glow Artistry" className="w-full h-full object-cover object-top scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-editorial font-bold text-stone-100">Uncompromising Luxury & Artistry</h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Located in the heart of Abuja at 40, Kpaduma II, Guzape, Asokoro Extension, Gami Glow Beauty Hub delivers bespoke studio sessions, mobile home glam, and high-end makeup training. Every client receives personalized attention to ensure their natural radiance shines through.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-stone-900 border border-stone-800 rounded-lg">
                    <div className="text-2xl font-bold font-editorial text-amber-400">1000+</div>
                    <div className="text-xs text-stone-400">Happy Clients & Brides</div>
                  </div>
                  <div className="p-4 bg-stone-900 border border-stone-800 rounded-lg">
                    <div className="text-2xl font-bold font-editorial text-amber-400">5+</div>
                    <div className="text-xs text-stone-400">Years Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'services' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h1 className="text-4xl font-editorial tracking-tight text-stone-100">Book an Appointment & Services</h1>
              <p className="text-stone-300 text-sm">
                Schedule your studio session, bridal makeover, or home service with Gami Glow Beauty Hub in Abuja.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="max-w-xl mx-auto bg-stone-900 border border-amber-500/40 p-8 rounded-xl text-center space-y-6">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-editorial font-bold text-stone-100">Appointment Confirmed</h3>
                <p className="text-stone-300 text-sm">{bookingSuccess}</p>
                <button 
                  onClick={() => setBookingSuccess(null)}
                  className="px-6 py-2.5 bg-amber-500 text-stone-950 font-semibold rounded text-xs hover:bg-amber-400 transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-xl font-editorial font-semibold text-stone-200">1. Select Service</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {services.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`cursor-pointer bg-stone-900 border rounded-lg overflow-hidden transition-all flex flex-col justify-between ${
                          selectedService?.id === service.id ? 'border-amber-500 ring-1 ring-amber-500' : 'border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="relative aspect-[16/9]">
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover object-top scale-105" referrerPolicy="no-referrer" />
                          <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-amber-400">
                            ₦{service.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="p-5 space-y-2">
                          <h4 className="font-semibold text-stone-100 text-base">{service.title}</h4>
                          <p className="text-xs text-stone-400">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl space-y-6 h-fit">
                  <h3 className="text-xl font-editorial font-semibold text-stone-200">2. Appointment Info</h3>
                  
                  {selectedService ? (
                    <div className="p-3 bg-stone-950 rounded border border-stone-800 text-xs space-y-1">
                      <div className="text-amber-400 font-semibold">{selectedService.title}</div>
                      <div className="text-stone-400">₦{selectedService.price.toLocaleString()} · {selectedService.duration}</div>
                    </div>
                  ) : (
                    <div className="text-xs text-stone-500 italic">Please select a service from the left.</div>
                  )}

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">Date</label>
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">Time Slot</label>
                      <select 
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Enter your name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="you@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">WhatsApp Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+234 8151 295 074"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={!selectedService}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-semibold rounded text-xs transition-colors shadow-lg shadow-amber-500/10"
                    >
                      Confirm Booking Request
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'shop' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h1 className="text-4xl font-editorial tracking-tight text-stone-100">Gami Glow Storefront</h1>
              <p className="text-stone-300 text-sm">
                Shop professional cosmetics used by Joseph Gift Gami for studio and bridal makeovers.
              </p>

              {/* Shade Finder Interactive Quiz Trigger */}
              <div className="pt-2">
                <button 
                  onClick={() => { setIsQuizOpen(true); setQuizStep(1); setQuizResult(null); }}
                  className="px-6 py-3 bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-stone-950 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Find Your Exact Foundation Shade (Interactive Quiz)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-stone-900 border border-stone-800 rounded-lg overflow-hidden flex flex-col">
                  <div 
                    onClick={() => setLightboxImage({ src: product.image, title: product.name, description: product.description })}
                    className="relative aspect-[4/5] overflow-hidden bg-stone-950 cursor-pointer"
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        wishlist.some(item => item.id === product.id) 
                          ? 'bg-amber-500 text-stone-950 shadow-lg' 
                          : 'bg-stone-950/70 text-stone-200 hover:text-amber-400'
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.some(item => item.id === product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-stone-400 mb-1">{product.category}</div>
                      <h3 className="font-semibold text-stone-100 text-base mb-2">{product.name}</h3>
                      <p className="text-xs text-stone-400 line-clamp-2 mb-4">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                      <span className="text-lg font-bold text-amber-400">₦{product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => { setSelectedProduct(product); setSelectedShade(product.shades[0]); }}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'gallery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h1 className="text-4xl font-editorial tracking-tight text-stone-100">Real Client Work & Makeovers</h1>
              <p className="text-stone-300 text-sm">
                Showcasing actual client makeovers by Gami Glow Beauty Hub (Veritas University Thanksgiving & event glam).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Traditional Wedding & Event Glam',
                  image: '/assets/aistudio/IMG-20261029-WA0004_f1748943.jpg',
                  desc: 'Flawless gele styling and rich traditional velvet attire makeup.'
                },
                {
                  title: 'Executive Studio Portrait',
                  image: '/assets/aistudio/IMG-20261029-WA0003_221be770.jpg',
                  desc: 'Classic professional studio makeover with immaculate skin finish.'
                },
                {
                  title: 'Radiant Copper & Yellow Glam',
                  image: '/assets/aistudio/IMG-20261105-WA0004_4a69d9cd.jpg',
                  desc: 'Vibrant photoshoot styling with copper hair and glowing highlights.'
                },
                {
                  title: 'Rust Orange Editorial Beat',
                  image: '/assets/aistudio/IMG-20261106-WA0006_8701e9ab.jpg',
                  desc: 'Detailed eye artistry and nude lips for rich melanin complexions.'
                },
                {
                  title: 'Pink Dress Curls & Glam',
                  image: '/assets/aistudio/IMG-20261105-WA0002_86529d18.jpg',
                  desc: 'Glamorous soft curls paired with flawless evening makeup.'
                }
              ].map((clientWork, idx) => (
                <div key={idx} className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden flex flex-col group">
                  <div 
                    onClick={() => setLightboxImage({ src: clientWork.image, title: clientWork.title, description: clientWork.desc })}
                    className="relative aspect-[4/5] overflow-hidden bg-stone-950 cursor-pointer"
                  >
                    <img src={clientWork.image} alt={clientWork.title} className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-editorial text-xl font-semibold text-stone-100">{clientWork.title}</h3>
                    <p className="text-xs text-stone-400">{clientWork.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'contact' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto px-6 py-16 space-y-12">
            <div className="text-center space-y-4">
              <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">Get In Touch</span>
              <h1 className="text-4xl sm:text-5xl font-editorial tracking-tight text-stone-100">Contact Gami Glow Beauty Hub</h1>
              <p className="text-stone-300 text-sm max-w-xl mx-auto">
                Reach out to us directly for studio appointments, home service bookings, or product inquiries in Abuja.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-stone-900 border border-stone-800 p-8 rounded-xl space-y-6">
                <h3 className="text-xl font-editorial font-semibold text-stone-100">Studio & Contact Information</h3>
                <div className="space-y-4 text-xs text-stone-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-stone-200">Abuja Studio Address</div>
                      <div>40, Kpaduma II, Guzape, Asokoro - Extension, Abuja.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-stone-200">Phone / WhatsApp Lines</div>
                      <div>+234 8151 295 074 / +234 80 2532 9410</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-stone-200">Email Address</div>
                      <div>josephgiftgami26@gmail.com</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800">
                  <button 
                    onClick={() => openWhatsAppPreset("Hi Gami Glow! I would like to inquire about booking a makeup session.")}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat Instantly on WhatsApp
                  </button>
                </div>
              </div>

              <div className="bg-stone-900 border border-stone-800 p-8 rounded-xl space-y-6">
                <h3 className="text-xl font-editorial font-semibold text-stone-100">Send a Quick Message</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! We will contact you shortly.'); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Your Name</label>
                    <input type="text" required placeholder="Amina Lawal" className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Email or Phone</label>
                    <input type="text" required placeholder="amina@example.com" className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Message</label>
                    <textarea rows={4} required placeholder="Tell us about your event or inquiry..." className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"></textarea>
                  </div>
                  <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded text-xs transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'admin' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto px-6 py-12 space-y-10">
            {/* Header & Metrics */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-stone-800 pb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-editorial tracking-tight text-stone-100">Admin Control Panel</h1>
                <p className="text-stone-300 text-xs sm:text-sm mt-1">Manage orders, product catalog, and makeover services.</p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
                <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Total Orders</div>
                  <div className="text-2xl font-bold font-editorial text-amber-400">{orders.length}</div>
                </div>
                <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Products</div>
                  <div className="text-2xl font-bold font-editorial text-stone-100">{products.length}</div>
                </div>
                <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl text-center">
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Services</div>
                  <div className="text-2xl font-bold font-editorial text-stone-100">{services.length}</div>
                </div>
              </div>
            </div>

            {/* Admin Sub-tabs Navigation */}
            <div className="flex items-center gap-3 border-b border-stone-800 pb-4">
              <button 
                onClick={() => setAdminSubTab('orders')}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${adminSubTab === 'orders' ? 'bg-amber-500 text-stone-950 shadow-lg' : 'bg-stone-900 text-stone-300 hover:bg-stone-800'}`}
              >
                Orders Management ({orders.length})
              </button>
              <button 
                onClick={() => setAdminSubTab('products')}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${adminSubTab === 'products' ? 'bg-amber-500 text-stone-950 shadow-lg' : 'bg-stone-900 text-stone-300 hover:bg-stone-800'}`}
              >
                Products Catalog ({products.length})
              </button>
              <button 
                onClick={() => setAdminSubTab('services')}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${adminSubTab === 'services' ? 'bg-amber-500 text-stone-950 shadow-lg' : 'bg-stone-900 text-stone-300 hover:bg-stone-800'}`}
              >
                Services List ({services.length})
              </button>
            </div>

            {/* Sub-tab 1: Orders */}
            {adminSubTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-editorial font-semibold text-stone-100">Customer Orders & Service Bookings</h3>
                  <span className="text-xs text-stone-400">Showing recent store activity</span>
                </div>

                <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-950 border-b border-stone-800 text-stone-400 uppercase tracking-wider">
                        <tr>
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Details</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800 text-stone-300">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-stone-950/50">
                            <td className="p-4 font-mono font-semibold text-amber-400">{order.id}</td>
                            <td className="p-4 font-medium text-stone-100">{order.customerName}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${order.type === 'Product Order' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                                {order.type}
                              </span>
                            </td>
                            <td className="p-4 max-w-xs truncate">{order.details}</td>
                            <td className="p-4 font-bold text-stone-100">₦{order.amount.toLocaleString()}</td>
                            <td className="p-4">
                              <select 
                                value={order.status}
                                onChange={(e) => {
                                  const newStatus = e.target.value as any;
                                  setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
                                }}
                                className={`bg-stone-950 border border-stone-800 rounded px-2 py-1 text-[11px] font-semibold ${
                                  order.status === 'Completed' || order.status === 'Confirmed' ? 'text-emerald-400' : 'text-amber-400'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => setOrders(prev => prev.filter(o => o.id !== order.id))}
                                className="p-1.5 bg-stone-800 hover:bg-red-900/40 text-stone-300 hover:text-red-400 rounded transition-colors"
                                title="Delete Order"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Products CRUD */}
            {adminSubTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-editorial font-semibold text-stone-100">Storefront Product Catalog</h3>
                  <button 
                    onClick={() => {
                      setEditingProduct(null);
                      setProductForm({ name: '', category: 'Face', price: 25000, description: '', image: '/assets/aistudio/IMG-20261029-WA0004_f1748943.jpg', shades: 'Amber 450, Ebony 500' });
                      setIsProductModalOpen(true);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded text-xs inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add New Product
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between">
                      <div className="flex gap-4 p-4 items-center border-b border-stone-800">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover object-top rounded-lg" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">{product.category}</span>
                          <h4 className="font-semibold text-stone-100 text-sm line-clamp-1">{product.name}</h4>
                          <div className="text-sm font-bold text-stone-200">₦{product.price.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between bg-stone-950/50">
                        <span className="text-[11px] text-stone-400">{product.shades.length} Shades Available</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({
                                name: product.name,
                                category: product.category,
                                price: product.price,
                                description: product.description,
                                image: product.image,
                                shades: product.shades.join(', ')
                              });
                              setIsProductModalOpen(true);
                            }}
                            className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => setProducts(prev => prev.filter(p => p.id !== product.id))}
                            className="p-2 bg-stone-800 hover:bg-red-900/40 text-stone-300 hover:text-red-400 rounded text-xs"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-tab 3: Services CRUD */}
            {adminSubTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-editorial font-semibold text-stone-100">Makeover & Consultation Services</h3>
                  <button 
                    onClick={() => {
                      setEditingService(null);
                      setServiceForm({ title: '', duration: '60 Minutes', price: 35000, description: '', image: '/assets/aistudio/IMG-20261029-WA0003_221be770.jpg' });
                      setIsServiceModalOpen(true);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded text-xs inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add New Service
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map(service => (
                    <div key={service.id} className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between">
                      <div className="flex gap-4 p-4 items-center border-b border-stone-800">
                        <img src={service.image} alt={service.title} className="w-16 h-16 object-cover object-top rounded-lg" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">{service.duration}</span>
                          <h4 className="font-semibold text-stone-100 text-sm line-clamp-1">{service.title}</h4>
                          <div className="text-sm font-bold text-stone-200">₦{service.price.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between bg-stone-950/50">
                        <span className="text-[11px] text-stone-400 line-clamp-1 max-w-[200px]">{service.description}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setEditingService(service);
                              setServiceForm({
                                title: service.title,
                                duration: service.duration,
                                price: service.price,
                                description: service.description,
                                image: service.image
                              });
                              setIsServiceModalOpen(true);
                            }}
                            className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs"
                            title="Edit Service"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => setServices(prev => prev.filter(s => s.id !== service.id))}
                            className="p-2 bg-stone-800 hover:bg-red-900/40 text-stone-300 hover:text-red-400 rounded text-xs"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

      </main>

      {/* Shade Finder Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-8 shadow-2xl relative space-y-6">
            <button onClick={() => setIsQuizOpen(false)} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-100">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Interactive Shade Matcher</div>
              <h3 className="text-2xl font-editorial font-bold text-stone-100">
                {quizResult ? 'Your Perfect Shade Match' : `Question ${quizStep} of 4`}
              </h3>
            </div>

            {!quizResult ? (
              <div className="space-y-6">
                {quizStep === 1 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-stone-200">1. What is your overall skin tone depth?</label>
                    {[
                      'Fair / Light',
                      'Medium / Caramel',
                      'Rich / Deep Bronze',
                      'Deep / Ebony'
                    ].map(opt => (
                      <button
                        key={opt}
                        onClick={() => { setQuizAnswers({...quizAnswers, depth: opt}); setQuizStep(2); }}
                        className="w-full text-left p-3.5 bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500 rounded-lg text-xs text-stone-200 transition-all flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-4 h-4 text-stone-500" />
                      </button>
                    ))}
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-stone-200">2. What are your wrist vein undertones?</label>
                    {[
                      'Blue or Purple (Cool Undertone)',
                      'Green (Warm / Golden Undertone)',
                      'Blue-Green / Mixed (Neutral Undertone)',
                      'Deep / Rich Golden Undershades'
                    ].map(opt => (
                      <button
                        key={opt}
                        onClick={() => { setQuizAnswers({...quizAnswers, undertone: opt}); setQuizStep(3); }}
                        className="w-full text-left p-3.5 bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500 rounded-lg text-xs text-stone-200 transition-all flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-4 h-4 text-stone-500" />
                      </button>
                    ))}
                  </div>
                )}

                {quizStep === 3 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-stone-200">3. What is your skin type?</label>
                    {[
                      'Oily (T-zone shine throughout the day)',
                      'Dry (Needs extra hydration and moisture)',
                      'Combination (Oily T-zone, normal cheeks)',
                      'Normal / Well-Balanced'
                    ].map(opt => (
                      <button
                        key={opt}
                        onClick={() => { setQuizAnswers({...quizAnswers, skinType: opt}); setQuizStep(4); }}
                        className="w-full text-left p-3.5 bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500 rounded-lg text-xs text-stone-200 transition-all flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <ChevronRight className="w-4 h-4 text-stone-500" />
                      </button>
                    ))}
                  </div>
                )}

                {quizStep === 4 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-stone-200">4. What foundation finish do you prefer?</label>
                    {[
                      'Velvet Matte (Long-wearing, velvet touch)',
                      'Radiant Glow (Luminous, dewy second-skin)',
                      'Natural Second-Skin Finish'
                    ].map(opt => (
                      <button
                        key={opt}
                        onClick={() => { 
                          setQuizAnswers({...quizAnswers, finish: opt}); 
                          setQuizResult(calculateShadeMatch());
                        }}
                        className="w-full text-left p-3.5 bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500 rounded-lg text-xs text-stone-200 transition-all flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <Check className="w-4 h-4 text-amber-500" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                  <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Your Recommended Foundation Shade</div>
                  <div className="text-3xl font-editorial font-bold text-stone-100">Gami Glow Silk Fluid Foundation - {quizResult}</div>
                  <p className="text-xs text-stone-300 pt-2">
                    Formulated with hyaluronic acid and Vitamin E for your {quizAnswers.depth.toLowerCase()} skin tone with {quizAnswers.undertone.toLowerCase()}.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      const foundProduct = products.find(p => p.id === 'p1') || products[0];
                      if (foundProduct) {
                        addToCart(foundProduct, quizResult);
                      }
                      setIsQuizOpen(false);
                    }}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded text-xs transition-colors"
                  >
                    Add Foundation to Cart ({quizResult})
                  </button>
                  <button 
                    onClick={() => { setQuizStep(1); setQuizResult(null); }}
                    className="px-4 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded text-xs transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-100 bg-stone-950/50 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/5] bg-stone-950">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover object-top scale-105" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs text-amber-400 font-semibold">{selectedProduct.category}</div>
                  <h3 className="text-2xl font-editorial font-bold text-stone-100">{selectedProduct.name}</h3>
                  <div className="text-xl font-bold text-amber-400">₦{selectedProduct.price.toLocaleString()}</div>
                  <p className="text-xs text-stone-300">{selectedProduct.description}</p>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct, selectedShade); setSelectedProduct(null); }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded text-xs transition-colors"
                >
                  Add to Cart (₦{selectedProduct.price.toLocaleString()})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl">
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <h3 className="font-editorial text-xl font-bold text-stone-100 flex items-center gap-2">
                <Heart className="w-5 h-5 fill-amber-500 text-amber-500" /> My Wishlist ({wishlist.length})
              </h3>
              <button onClick={() => setIsWishlistOpen(false)} className="p-2 text-stone-400 hover:text-stone-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs space-y-2">
                  <Heart className="w-12 h-12 text-stone-700 mx-auto stroke-1" />
                  <p>Your wishlist is currently empty.</p>
                  <p className="text-stone-500">Click the heart icon on any product in the Shop to save items here.</p>
                </div>
              ) : (
                wishlist.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-3 bg-stone-950 rounded border border-stone-800 items-center justify-between">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover object-top scale-105 rounded" referrerPolicy="no-referrer" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-semibold text-xs text-stone-100">{item.name}</h4>
                      <div className="text-xs font-bold text-amber-400">₦{item.price.toLocaleString()}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => { addToCart(item, item.shades[0]); setIsWishlistOpen(false); }}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-[10px] font-semibold rounded transition-colors whitespace-nowrap"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => toggleWishlist(item)}
                        className="text-stone-500 hover:text-red-400 text-[10px] text-center"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl">
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <h3 className="font-editorial text-xl font-bold text-stone-100">Your Cart ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-stone-400 hover:text-stone-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-stone-950 rounded border border-stone-800 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover object-top scale-105 rounded" referrerPolicy="no-referrer" />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-xs text-stone-100">{item.name}</h4>
                    <div className="text-xs font-bold text-stone-200">₦{item.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded px-2 py-1">
                    <button onClick={() => updateQuantity(item.id, item.selectedShade, -1)} className="text-stone-400">-</button>
                    <span className="text-xs font-semibold text-stone-100">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedShade, 1)} className="text-stone-400">+</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-800 space-y-4 bg-stone-950">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-stone-200">Total</span>
                  <span className="text-amber-400">₦{cartTotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded text-xs"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Floating Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isWhatsAppOpen && (
          <div className="mb-4 w-72 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="font-semibold text-xs text-stone-100">Gami Glow WhatsApp Booking</span>
              <button onClick={() => setIsWhatsAppOpen(false)} className="text-stone-400"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2">
              {[
                "Hi Gami Glow! I'd like to book a Bridal Makeover.",
                "Hi Gami Glow! I'd like to book a Studio Makeup Session.",
                "Hi Gami Glow! I'm inquiring about Home Services in Abuja.",
                "Hi Gami Glow! I want to book a Birthday Shots Makeover."
              ].map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => openWhatsAppPreset(msg)}
                  className="w-full text-left p-2.5 bg-stone-950 hover:bg-stone-800 border border-stone-800 rounded text-[11px] text-stone-300 hover:text-amber-400 flex items-center justify-between"
                >
                  <span>{msg}</span>
                  <ExternalLink className="w-3 h-3 text-stone-500 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button onClick={() => setIsProductModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-100"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-editorial font-bold text-stone-100">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingProduct) {
                setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
                  ...p,
                  name: productForm.name,
                  category: productForm.category,
                  price: Number(productForm.price),
                  description: productForm.description,
                  image: productForm.image,
                  shades: productForm.shades.split(',').map(s => s.trim())
                } : p));
              } else {
                const newId = 'p-' + Math.floor(100 + Math.random() * 900);
                setProducts(prev => [...prev, {
                  id: newId,
                  name: productForm.name,
                  category: productForm.category,
                  price: Number(productForm.price),
                  rating: 5.0,
                  reviewsCount: 1,
                  image: productForm.image,
                  description: productForm.description,
                  shades: productForm.shades.split(',').map(s => s.trim()),
                  ingredients: 'Aqua, Glycerin, Vitamin E, Mineral Pigments.'
                }]);
              }
              setIsProductModalOpen(false);
            }} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-300 mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-300 mb-1">Category</label>
                  <select 
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value as any})}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                  >
                    <option value="Face">Face</option>
                    <option value="Lips">Lips</option>
                    <option value="Eyes">Eyes</option>
                    <option value="Palettes">Palettes</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-stone-300 mb-1">Price (₦)</label>
                  <input 
                    type="number" 
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: Number(e.target.value)})}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-stone-300 mb-1">Product Image (URL or Select Asset)</label>
                <input 
                  type="text" 
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100 mb-2"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-400">Quick select:</span>
                  {[
                    '/assets/aistudio/IMG-20261029-WA0004_f1748943.jpg',
                    '/assets/aistudio/IMG-20261105-WA0004_4a69d9cd.jpg',
                    '/assets/aistudio/IMG-20261106-WA0006_8701e9ab.jpg',
                    '/assets/aistudio/IMG-20261105-WA0002_86529d18.jpg'
                  ].map((imgAsset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProductForm({...productForm, image: imgAsset})}
                      className={`w-8 h-8 rounded border overflow-hidden ${productForm.image === imgAsset ? 'border-amber-500 ring-2 ring-amber-500' : 'border-stone-800'}`}
                    >
                      <img src={imgAsset} alt="asset" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium text-stone-300 mb-1">Description</label>
                <textarea 
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                ></textarea>
              </div>
              <div>
                <label className="block font-medium text-stone-300 mb-1">Shades (comma separated)</label>
                <input 
                  type="text" 
                  value={productForm.shades}
                  onChange={(e) => setProductForm({...productForm, shades: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded transition-colors">
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Service Add/Edit Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button onClick={() => setIsServiceModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-100"><X className="w-5 h-5" /></button>
            <h3 className="text-xl font-editorial font-bold text-stone-100">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingService) {
                setServices(prev => prev.map(s => s.id === editingService.id ? {
                  ...s,
                  title: serviceForm.title,
                  duration: serviceForm.duration,
                  price: Number(serviceForm.price),
                  description: serviceForm.description,
                  image: serviceForm.image
                } : s));
              } else {
                const newId = 'c-' + Math.floor(100 + Math.random() * 900);
                setServices(prev => [...prev, {
                  id: newId,
                  title: serviceForm.title,
                  duration: serviceForm.duration,
                  price: Number(serviceForm.price),
                  description: serviceForm.description,
                  image: serviceForm.image
                }]);
              }
              setIsServiceModalOpen(false);
            }} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-300 mb-1">Service Title</label>
                <input 
                  type="text" 
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-stone-300 mb-1">Duration</label>
                  <input 
                    type="text" 
                    required
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-300 mb-1">Price (₦)</label>
                  <input 
                    type="number" 
                    required
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({...serviceForm, price: Number(e.target.value)})}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-stone-300 mb-1">Description</label>
                <textarea 
                  rows={3}
                  required
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-stone-100"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded transition-colors">
                {editingService ? 'Save Changes' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer with Social Icons */}
      <footer className="border-t border-stone-800 bg-stone-950 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="font-editorial text-2xl font-bold text-amber-500">GAMI GLOW BEAUTY HUB</h3>
            <p className="text-xs text-stone-400">Beauty · Glam · Confidence</p>
            <p className="text-xs text-stone-500">40, Kpaduma II, Guzape, Asokoro - Extension, Abuja.</p>
            
            {/* Social Icons in Footer */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com/josephgiftgami" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 border border-stone-800 rounded-full hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition-all" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://tiktok.com/@josephgiftgami" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 border border-stone-800 rounded-full hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition-all" title="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
              <a href="https://snapchat.com/add/josephgiftgami" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 border border-stone-800 rounded-full hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition-all" title="Snapchat">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.016 2.404c-3.322 0-6.024 2.702-6.024 6.024 0 2.215 1.206 4.148 3.012 5.187-.311.455-.589.96-.807 1.503-.497 1.242-.239 2.651.681 3.491.241.222.544.382.883.475-.487.876-1.399 2.164-3.528 2.316-.367.026-.642.33-.615.698.026.368.33.642.698.615 2.766-.197 4.143-1.897 4.67-2.784.341.07.693.107 1.05.107s.709-.037 1.05-.107c.527.887 1.904 2.587 4.67 2.784.368.027.672-.247.698-.615.027-.368-.248-.672-.615-.698-2.129-.152-3.041-1.44-3.528-2.316.339-.093.642-.253.883-.475.92-.84 1.178-2.249.681-3.491-.218-.543-.496-1.048-.807-1.503 1.806-1.039 3.012-2.972 3.012-5.187 0-3.322-2.702-6.024-6.024-6.024z"/></svg>
              </a>
              <a href="https://facebook.com/josephgiftgami" target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-900 border border-stone-800 rounded-full hover:bg-amber-500 hover:text-stone-950 text-amber-400 transition-all" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.587 9 4.615V8z"/></svg>
              </a>
            </div>
          </div>

          <div className="space-y-2 text-xs text-stone-400">
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider mb-2">Contacts</h4>
            <div>Phone: +234 8151 295 074 / +234 80 2532 9410</div>
            <div>Email: josephgiftgami26@gmail.com</div>
          </div>

          <div className="space-y-2 text-xs text-stone-400">
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider mb-2">Services</h4>
            <div>Studio Makeup Session · Soft/Full Glam</div>
            <div>Home Services · Bridal Makeovers</div>
            <div>Birthday Shots & Event Makeovers</div>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal with Zoom Capabilities */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8"
          onClick={() => { setLightboxImage(null); setIsLightboxZoomed(false); }}
        >
          <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); setIsLightboxZoomed(!isLightboxZoomed); }}
              className="p-3 bg-stone-900/80 border border-stone-800 rounded-full text-stone-200 hover:text-amber-400 transition-all shadow-xl"
              aria-label="Toggle Zoom"
              title={isLightboxZoomed ? "Zoom Out" : "Zoom In"}
            >
              {isLightboxZoomed ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => { setLightboxImage(null); setIsLightboxZoomed(false); }}
              className="p-3 bg-stone-900/80 border border-stone-800 rounded-full text-stone-200 hover:text-amber-400 transition-all shadow-xl"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div 
            className="relative max-w-5xl max-h-[75vh] overflow-hidden rounded-xl border border-stone-800 bg-stone-900 shadow-2xl flex items-center justify-center cursor-zoom-in"
            onClick={(e) => { e.stopPropagation(); setIsLightboxZoomed(!isLightboxZoomed); }}
          >
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.title} 
              className={`max-h-[70vh] max-w-full object-contain transition-transform duration-300 ${isLightboxZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'}`}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-6 text-center space-y-1 max-w-xl">
            <h3 className="text-xl font-editorial font-bold text-stone-100">{lightboxImage.title}</h3>
            {lightboxImage.description && (
              <p className="text-xs text-stone-400">{lightboxImage.description}</p>
            )}
            <p className="text-[10px] text-stone-500 pt-1">Click image or zoom button to inspect details</p>
          </div>
        </div>
      )}
    </div>
  );
}
