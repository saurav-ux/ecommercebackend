import express from 'express'
const wishlistRoute = express.Router()
import LoginData from "../Schema.js";

wishlistRoute.post('/:userId', async (req, res) => {
    console.log("body",req.body)
    const { off, price, cutprice, imgName } = req.body;
    const userId = req.params.userId;
  
    try {
        const userDetails = await LoginData.findById(userId);
  
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        // Creating a new wishlist item
        const newWishlistItem = {
            off,
            price,
            cutprice,
            imgName
        };
  
        userDetails.wishlist.push(newWishlistItem); // Adding the new item to the wishlist array
        await userDetails.save(); // Save the updated user details
  
        res.status(201).json({ message: 'Item added to wishlist successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error in Post' });
    }
  });

wishlistRoute.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
        const userDetails = await LoginData.findById(userId);
  
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        const wishlistItems = userDetails.wishlist;
        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
  });

  //delete
  // DELETE request to remove a wishlist item by user ID and item ID
wishlistRoute.delete('/:userId/:itemId', async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    try {
        const userDetails = await LoginData.findById(userId);

        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }

        const wishlistItem = userDetails.wishlist.find(item => item._id.toString() === itemId);

        if (!wishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        // Remove the item from the wishlist array
        userDetails.wishlist = userDetails.wishlist.filter(item => item._id.toString() !== itemId);
        await userDetails.save(); // Save the updated user details

        res.status(200).json({ message: 'Item removed from wishlist successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Delete Server Error' });
    }
});

  

export default wishlistRoute