// src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase'; 
import { useAuth } from '../context/AuthContext'; 
// Import updateDoc and increment for points system
import { doc, onSnapshot, collection, query, addDoc, deleteDoc, setDoc, updateDoc, increment } from 'firebase/firestore'; 
import { 
  FiUser, 
  FiBox, 
  FiShoppingCart, 
  FiLogOut, 
  FiSettings, 
  FiKey, 
  FiBell, 
  FiTrash2, 
  FiPlus, 
  FiX, 
  FiLoader 
} from "react-icons/fi";
import { toast } from 'react-toastify';

// Modal Component (corrected class names for background opacity and blur)
const Modal = ({ title, children, onClose }) => (
  // Corrected: Ensure valid Tailwind CSS classes for the overlay background.
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">
    <div className="bg-[#2E4A4E] text-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors">
        <FiX size={24} />
      </button>
      {children}
    </div>
  </div>
);

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  // State for modals and forms
  const [modal, setModal] = useState(null); 
  const [profileForm, setProfileForm] = useState({});
  const [newListingForm, setNewListingForm] = useState({ title: '', price: '' });
  const [newPurchaseForm, setNewPurchaseForm] = useState({ title: '', price: '' });

  // Helper function for default profile data
  const getDefaultProfileData = (user) => ({
    name: "no name", 
    email: user?.email || "no email",
    joined: 'N/A', 
    location: "no place",
    points: 0 // Initialize points for the points system
  });

  // --- Data Fetching and Real-time Updates (Firestore) ---
  useEffect(() => {
    if (!currentUser) {
      setLoadingProfile(false);
      setLoadingData(false);
      return; 
    }

    // 1. Fetch User Profile (Real-time listener)
    const userDocRef = doc(db, "users", currentUser.uid);
    const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
      let profileData = getDefaultProfileData(currentUser); 
      
      if (docSnap.exists()) {
        profileData = docSnap.data();
      } 
      
      setUserProfile(profileData);
      setProfileForm(profileData);
      setLoadingProfile(false);
    }, (error) => {
        console.error("Error fetching user profile:", error);
        
        // Set user profile to default values on error to ensure UI renders
        setUserProfile(getDefaultProfileData(currentUser));
        setProfileForm(getDefaultProfileData(currentUser));
        
        setLoadingProfile(false);
    });

    // 2. Fetch Listings (Real-time listener)
    const listingsQuery = query(collection(db, "users", currentUser.uid, "listings"));
    const unsubscribeListings = onSnapshot(listingsQuery, (querySnapshot) => {
      const listingsData = [];
      querySnapshot.forEach((doc) => {
        listingsData.push({ id: doc.id, ...doc.data() });
      });
      setListings(listingsData);
    }, (error) => {
        console.error("Error fetching listings:", error);
    });

    // 3. Fetch Purchases (Real-time listener)
    const purchasesQuery = query(collection(db, "users", currentUser.uid, "purchases"));
    const unsubscribePurchases = onSnapshot(purchasesQuery, (querySnapshot) => {
      const purchasesData = [];
      querySnapshot.forEach((doc) => {
        purchasesData.push({ id: doc.id, ...doc.data() });
      });
      setPurchases(purchasesData);
      setLoadingData(false);
    }, (error) => {
        console.error("Error fetching purchases:", error);
        setLoadingData(false);
    });

    // Cleanup listeners on component unmount or when currentUser changes
    return () => {
      unsubscribeProfile();
      unsubscribeListings();
      unsubscribePurchases();
    };
  }, [currentUser]); 

  // --- Authentication Actions ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out successfully.");
      navigate('/login');
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  // --- CRUD Operations ---
  
  const handleAddListing = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      // 1. Add the listing
      await addDoc(collection(db, "users", currentUser.uid, "listings"), newListingForm);

      // 2. Award points (e.g., 50 points for adding a listing)
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: increment(50) 
      });

      toast.success("Listing added and 50 points awarded!");
      setNewListingForm({ title: '', price: '' });
      closeModal();
    } catch (error) {
      console.error("Error adding listing:", error);
      toast.error("Failed to add listing.");
    }
  };
  
  const handleDeleteListing = async (id) => {
    if (!currentUser) return;
    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "listings", id));
      toast.success("Listing deleted.");
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing.");
    }
  };

  const handleAddPurchase = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      // 1. Add the purchase
      await addDoc(collection(db, "users", currentUser.uid, "purchases"), newPurchaseForm);

      // 2. Award points (e.g., 10 points for adding a purchase)
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        points: increment(10) 
      });
      
      toast.success("Purchase added and 10 points awarded!");
      setNewPurchaseForm({ title: '', price: '' });
      closeModal();
    } catch (error) {
      console.error("Error adding purchase:", error);
      toast.error("Failed to add purchase.");
    }
  };

  const handleDeletePurchase = async (id) => {
    if (!currentUser) return;
    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "purchases", id));
      toast.success("Purchase deleted.");
    } catch (error) {
      console.error("Error deleting purchase:", error);
      toast.error("Failed to delete purchase.");
    }
  };

  // --- Profile Update ---
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      // Use setDoc with merge: true to update existing fields or create the document if it doesn't exist
      await setDoc(userDocRef, profileForm, { merge: true });
      toast.success("Profile updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  // --- Modal Logic ---
  const openModal = (type) => {
    // Sync profileForm state with current userProfile data when opening the modal
    if (type === 'profile' && userProfile) {
      setProfileForm(userProfile);
    }
    setModal(type);
  };

  const closeModal = () => {
    setModal(null);
  };

  // --- Rendering based on loading/user state ---

  if (loadingProfile || loadingData) {
    return (
      <div className="min-h-screen bg-[#22333B] flex flex-col justify-center items-center text-white">
        <FiLoader className="animate-spin text-4xl mb-4" />
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (!userProfile) {
      return null; 
  }

  return (
    // Main container for the dashboard content
    <div className="min-h-screen bg-[#22333B] text-[white] p-6 pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-[white] text-[#22333B] rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold">
              {userProfile.name ? userProfile.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userProfile.name || 'no name'}</h1>
              <p className="text-sm text-[white]">{userProfile.email || 'no email'}</p>
              <p className="text-sm text-[white]">Location: {userProfile.location || 'no place'}</p>
              {/* Display Points */}
              <p className="text-lg font-bold text-yellow-400 mt-2">
                Points: {userProfile.points !== undefined ? userProfile.points : 0}
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-4 md:mt-0">
            <FiLogOut /> Logout
          </button>
        </div>

        {/* My Listings */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiBox /> My Listings
            </h2>
            <button onClick={() => openModal('addListing')} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
              <FiPlus /> Add Listing
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {listings.length === 0 ? (
                <p className="text-gray-400">No listings found.</p>
            ) : (
                listings.map(item => (
                <div key={item.id} className="bg-[#2E4A4E] p-4 rounded-xl shadow-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-[white]">{item.price}</p>
                    </div>
                    <button onClick={() => handleDeleteListing(item.id)} className="text-red-500 hover:text-red-700">
                      <FiTrash2 size={20} />
                    </button>
                </div>
                ))
            )}
          </div>
        </div>

        {/* My Purchases */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiShoppingCart /> My Purchases
            </h2>
            <button onClick={() => openModal('addPurchase')} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
              <FiPlus /> Add Purchase
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {purchases.length === 0 ? (
                <p className="text-gray-400">No purchases found.</p>
            ) : (
                purchases.map(item => (
                <div key={item.id} className="bg-[#2E4A4E] p-4 rounded-xl shadow-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-[white]">{item.price}</p>
                        <span className="inline-block mt-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          {item.status || 'Purchased'}
                        </span>
                    </div>
                    <button onClick={() => handleDeletePurchase(item.id)} className="text-red-500 hover:text-red-700">
                      <FiTrash2 size={20} />
                    </button>
                </div>
                ))
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiSettings /> Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            <div className="bg-[#2E4A4E] p-4 rounded-xl shadow-md flex gap-4 items-start cursor-pointer hover:bg-[#395B64] transition" onClick={() => openModal('profile')}>
              <FiUser size={24} />
              <div>
                <h4 className="font-semibold mb-1">Edit Profile</h4>
                <p className="text-[white] text-sm">Update your name, email or location.</p>
              </div>
            </div>
            <div className="bg-[#2E4A4E] p-4 rounded-xl shadow-md flex gap-4 items-start cursor-pointer hover:bg-[#395B64] transition" onClick={() => openModal('password')}>
              <FiKey size={24} />
              <div>
                <h4 className="font-semibold mb-1">Change Password</h4>
                <p className="text-[white] text-sm">Secure your account with a new password.</p>
              </div>
            </div>
            <div className="bg-[#2E4A4E] p-4 rounded-xl shadow-md flex gap-4 items-start cursor-pointer hover:bg-[#395B64] transition" onClick={() => openModal('notifications')}>
              <FiBell size={24} />
              <div>
                <h4 className="font-semibold mb-1">Notification Preferences</h4>
                <p className="text-[white] text-sm">Customize what notifications you receive.</p>
              </div>
            </div>
            <div className="bg-[#2E4A4E] p-4 rounded-xl shadow-md flex gap-4 items-start cursor-pointer hover:bg-[#395B64] transition" onClick={() => openModal('delete')}>
              <FiTrash2 size={24} />
              <div>
                <h4 className="font-semibold mb-1 text-red-500">Delete Account</h4>
                <p className="text-[white] text-sm">Permanently remove your account.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-sm text-[white]">
          &copy; 2025 Customer Dashboard | Built by Jeet Pitale
        </footer>
      </div>

      {/* Modals are placed here, outside the main container div to ensure they render above the content. */}
      {modal === 'profile' && (
        <Modal title="Edit Profile" onClose={closeModal}>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70">Name</label>
              <input 
                type="text" 
                name="name" 
                value={profileForm.name || ''} 
                onChange={handleProfileChange} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-700 text-white" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70">Email</label>
              <input 
                type="email" 
                name="email" 
                value={profileForm.email || ''} 
                onChange={handleProfileChange} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-700 text-white" 
                disabled 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70">Location</label>
              <input 
                type="text" 
                name="location" 
                value={profileForm.location || ''} 
                onChange={handleProfileChange} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-700 text-white" 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">Save Changes</button>
          </form>
        </Modal>
      )}

      {modal === 'password' && (
        <Modal title="Change Password" onClose={closeModal}>
          <p className="text-white/70">Password changes are handled via Firebase Auth methods.</p>
        </Modal>
      )}

      {modal === 'notifications' && (
        <Modal title="Notification Preferences" onClose={closeModal}>
          <p className="text-white/70">Notification settings placeholder.</p>
        </Modal>
      )}

      {modal === 'delete' && (
        <Modal title="Delete Account" onClose={closeModal}>
          <p className="text-red-400 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
        </Modal>
      )}

      {modal === 'addListing' && (
        <Modal title="Add New Listing" onClose={closeModal}>
          <form onSubmit={handleAddListing} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70">Title</label>
              <input 
                type="text" 
                name="title" 
                value={newListingForm.title} 
                onChange={(e) => setNewListingForm({ ...newListingForm, title: e.target.value })} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-700 text-white" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70">Price</label>
              <input 
                type="text" 
                name="price" 
                value={newListingForm.price} 
                onChange={(e) => setNewListingForm({ ...newListingForm, price: e.target.value })} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-700 text-white" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">Add Listing</button>
          </form>
        </Modal>
      )}

      {modal === 'addPurchase' && (
        <Modal title="Add New Purchase" onClose={closeModal}>
          <form onSubmit={handleAddPurchase} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70">Title</label>
              <input 
                type="text" 
                name="title" 
                value={newPurchaseForm.title} 
                onChange={(e) => setNewPurchaseForm({ ...newPurchaseForm, title: e.target.value })} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-700 text-white" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70">Price</label>
              <input 
                type="text" 
                name="price" 
                value={newPurchaseForm.price} 
                onChange={(e) => setNewPurchaseForm({ ...newPurchaseForm, price: e.target.value })} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-700 text-white" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">Add Purchase</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;