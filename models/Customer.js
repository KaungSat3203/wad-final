import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true,
    get: function(v) { return v ? v.toISOString().split('T')[0] : null; }
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true
  },
  interests: {
    type: String,
    required: true
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

const Customer = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;