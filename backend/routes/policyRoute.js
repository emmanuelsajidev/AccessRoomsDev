

let router = require('express').Router();
const policyModel=require('../models/policyModel');
const Misc = require('../controllers/Misc');
const adminAuth=require('../middleware/adminAuth');


// //Add policy
router.post('/policy/add', adminAuth,async (req, res) => {
    try {
        var { type, name, content } = req.body;

        if (Misc.isnullorempty(type)) {
            type = "all";
        }

        var policy = await policyModel.findOne({  name: name, status: 'Active' });
        if (!Misc.isnullorempty(policy)) {
            res.status(200).json({
                status: false,
                msg: 'Already exists'
            });
            return;
        }

        var add = new policyModel();
        add.type = type;
        add.name = name;
        add.content = content;

        try {
            let dbadd = await add.save();

            res.status(200).json({
                status: true,
                msg: 'Policy added successfully',
                id: dbadd._id
            });
            return;

        } catch (ex) {
            console.log(ex);
            res.status(200).json({
                status: false,
                msg: 'Failed to add policy'
            });
            return;
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong'
        });
    }
});



//Delete policy
router.post('/policy/delete/:id',adminAuth, async (req, res) => {
    try {
        const { id } = req.params;

        var policy = await policyModel.findOne({ _id: id });
        if (Misc.isnullorempty(policy)) {
            res.status(200).json({
                status: false,
                msg: 'Failed to find corresponding policy'
            });
            return;
        }

        try {
            policy.status = 'Deleted';

            await policy.save();

            res.status(200).json({
                status: true,
                msg: 'Policy deleted successfully'
            });
            return;
        } catch (ex) {
            console.log(ex);
            res.status(200).json({
                status: false,
                msg: 'Failed to delete policy'
            });
            return;
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong'
        });
    } 
});




//Update policy
router.post('/policy/update', adminAuth, async (req, res) => {
    try {
        var { type, name, content } = req.body;

      //   if (Misc.isnullorempty(type)) {
      //       res.status(200).json({
      //           status: false,
      //           msg: 'Invalid type.'
      //       });
      //       return;
      //   }
        if (Misc.isnullorempty(name)) {
            res.status(200).json({
                status: false,
                msg: 'Invalid name.'
            });
            return;
        }
        if (Misc.isnullorempty(content)) {
            res.status(200).json({
                status: false,
                msg: 'Invalid content.'
            });
            return;
        }
      //   if (!(['all', 'customer', 'seller'].includes(type))) {
      //       res.status(200).json({
      //           status: false,
      //           msg: 'Invalid type'
      //       });
      //       return;
      //   }

        var policy = await policyModel.findOne({  name: name, status: 'Active' });
        if (Misc.isnullorempty(policy)) {
            res.status(200).json({
                status: false,
                msg: 'Failed to find corresponding policy'
            });
            return;
        }

        policy.content = content;

        try {
            policy = await policy.save();

            res.status(200).json({
                status: true,
                msg: 'Policy updated successfully'
            });
            return;

        } catch (ex) {
            console.log(ex);
            res.status(200).json({
                status: false,
                msg: 'Failed to update policy'
            });
            return;
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong'
        });
    }
});




// //List of policy
router.get('/policy/list', async (req, res) => {
    try {
        var policy = await policyModel.find({ status: 'Active' }).sort({ update_date: -1 });
        
        res.status(200).json({
            status: true,
            msg: 'Policy list retrieved Successfully',
            length: policy.length,
            data: policy
        });
        return;

    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong'
        });
    }
});




//View policy
router.get('/policy/view', async (req, res) => {
    try {
        const { /*id,*/ type, name } = req.query;
        
        var query = { type: 'all', name: name, status: 'Active' }

      //   if (!Misc.isnullorempty(id)) {
      //       query._id = id;
      //   }
      //   else if (!Misc.isnullorempty(type)) {
      //       query.type = type;
      //   }

        if (!Misc.isnullorempty(name)) {
            query.name = name;
        }

        var policy = await policyModel.findOne(query);
        if (Misc.isnullorempty(policy)) {
            res.status(200).json({
                status: false,
                msg: 'Failed to find corresponding policy'
            });
            return;
        }

        res.status(200).json({
            status: true,
            msg: 'Policy retrieved Successfully',
            data: policy
        });
        return;

    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong'
        });
    }
});



module.exports = router;