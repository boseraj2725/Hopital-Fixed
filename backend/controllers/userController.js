const User = require("../models/User");
const bcrypt = require("bcryptjs");


// ==========================
// Get Profile
// ==========================
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
        .select("-password");


        if(!user){

            return res.status(404).json({

                success:false,
                message:"User Not Found"

            });

        }


        res.status(200).json({

            success:true,
            user

        });


    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



// ==========================
// Update Profile
// ==========================
const updateProfile = async (req, res) => {

    try {


        const user = await User.findById(req.user.id);


        if(!user){

            return res.status(404).json({

                success:false,
                message:"User Not Found"

            });

        }



        user.name = req.body.name || user.name;

        user.email = req.body.email || user.email;

        user.phone = req.body.phone || user.phone;

        user.address = req.body.address || user.address;

        user.gender = req.body.gender || user.gender;

        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;



        await user.save();



        res.status(200).json({

            success:true,

            message:"Profile Updated Successfully",

            user

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};



// ==========================
// Upload Profile Image
// ==========================
const uploadProfileImage = async (req,res)=>{


    try{


        const user = await User.findById(req.user.id);



        if(!user){

            return res.status(404).json({

                success:false,

                message:"User Not Found"

            });

        }



        if(!req.file){

            return res.status(400).json({

                success:false,

                message:"Please Upload Image"

            });

        }



        user.profileImage = req.file.filename;


        await user.save();



        res.status(200).json({

            success:true,

            message:"Profile Image Uploaded Successfully",

            image:req.file.filename

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};



// ==========================
// Change Password
// ==========================
const changePassword = async (req, res) => {

    try {


        const {
            oldPassword,
            newPassword
        } = req.body;



        const user = await User.findById(req.user.id);



        if(!user){

            return res.status(404).json({

                success:false,

                message:"User Not Found"

            });

        }



        const isMatch = await bcrypt.compare(
            oldPassword,
            user.password
        );



        if(!isMatch){

            return res.status(400).json({

                success:false,

                message:"Old Password is Incorrect"

            });

        }



        user.password = await bcrypt.hash(
            newPassword,
            10
        );



        await user.save();



        res.status(200).json({

            success:true,

            message:"Password Changed Successfully"

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};



module.exports = {

    getProfile,

    updateProfile,

    uploadProfileImage,

    changePassword

};