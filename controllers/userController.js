const User = require('../models/user');
const bcrypt = require('bcrypt');
const { userProfileUpdateValidate } = require('../utils/userValidation')


//registration
const register = async (req, res) => {
    const { user_id, username, password, phone_number, email, address } = req.body;

    try {
        //user already exists condition
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // password encrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // new user and adding password to the password field
        // saving the user
        const newUser = await User.create({
            user_id,
            username,
            password: hashedPassword,
            phone_number,
            email,
            address
        });

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        //checking if the user is present
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist, Auth failed' });
        }

        //checking if the password is matching
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            return res.status(400).json({ success: false, message: 'Invalid user, Auth failed' });
        }

        // Create session data
        req.session.user = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        return res.status(200).json({ success: true, message: 'Login successful' });
    }
    catch (error) {
        console.error('Login error:', error);
        console.error('Request body:', req.body);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}


const updateUser = async (req, res) => {
    try {
        //validating the details entered
        userProfileUpdateValidate(req, res, async () => {
            const { username, phone_number, email, address } = req.body;

            if (!req.session || !req.session.user || !req.session.user._id) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            //get userId from session
            const userId = req.session.user._id;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            //new data
            user.username = username;
            user.phone_number = phone_number;
            user.email = email;
            user.address = address;

            await user.save();
            return res.status(200).json({ success: true, message: 'User updated successfully' });
        });
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


const getUserInfo = async (req, res) => {
    try {
        // checking if user is authenticated
        if (!req.session || !req.session.user || !req.session.user._id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // get data from the session
        const userId = req.session.user._id;

        // Finding the user using userId
        const user = await User.findById(userId, { password: 0 }); // Exclude password from the query result

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send user information 
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error fetching user information:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const logoutUser = async (req, res) => {
    try {
        // Clear the user session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error clearing session:', err);
                return res.status(500).json({ success: false, message: 'Error clearing session' });
            }
            // Respond with a success message
            return res.status(200).json({ success: true, message: 'Logout successful' });
        });
    } catch (error) {
        console.error('Error logging out user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



const updateAddress = async (req, res) => {
    try {
        const { address } = req.body; // Assuming only the address string is provided 

        // checking if user is authenticated
        if (!req.session || !req.session.user || !req.session.user._id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // get user ID from the session
        const userId = req.session.user._id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update the address
        user.address = address;

        await user.save();

        return res.status(200).json({ success: true, message: 'Address updated successfully', data: user.address });
    } catch (error) {
        console.error('Error updating address:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {
    register,
    loginUser,
    updateUser,
    getUserInfo,
    logoutUser,
    updateAddress,
};

