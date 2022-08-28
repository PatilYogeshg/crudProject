const UserModel = require('../model/user')
const logger = require('../../util/logger')

// Create and Save a new user
exports.create = async (req, res) => {
    // console.log("req.body",req.body)
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ "message": "Content can not be empty!" });
        console.log("error^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    }
    
    const user = new UserModel({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phone : req.body.phone
    });
    
    await user.save().then(data => {
        logger.info(
            ` User Created Successfully`
          );
        res.send({
            message:"User Created Successfully!!",
            user:data
        });
    }).catch(err => {
        logger.error(
            ` Error Occured | ${err}`
          );
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        logger.error(
            ` Error Occured | ${err}`
          );
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        logger.error(
            ` Error Occured | ${err}`
          );
        res.status(404).json({ message: error.message});
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            logger.info(
                `User Updated Successfully.`
              );
            res.send({ message: "User Updated Successfully." })
        }
    }).catch(err => {
        logger.error(
            ` Error Occured | ${err}`
          );
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
            logger.info(
                `User deleted successfully!.`
              );
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        logger.error(
            ` Error Occured | ${err}`
          );
        res.status(500).send({
          message: err.message
        });
    });
};