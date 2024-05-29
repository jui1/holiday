const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;
        const newEnquiry = new Enquiry({ name, email, mobile, message });
        await newEnquiry.save();
        res.status(201).json(newEnquiry);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
exports.updateEnquery = async (req, res) => {
    console.log("update function being called");
    try {
        const { id,status } = req.body;
        console.log(req.body);
        if (status !== 'delete') {
            try {
                const updatedEnquiry = await Enquiry.findByIdAndUpdate(
                    id,           
                    { status },    
                    { new: true }
                );
                console.log(updatedEnquiry, "here is the updated enquiry");
            } catch (error) {
                console.error("Error updating enquiry:", error);
            }
        }
        else if(status==='delete'){
            const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
           console.log(deletedEnquiry, "here is the deleted enquiry");
        }
        res.status(201).json({msg:"query updated Suscessfully"});
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.getEnquiries = async (req, res) => {
    try {
       
        const enquiries = await Enquiry.find();
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports. getEnquiriesummm = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }
        res.status(200).json(enquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

