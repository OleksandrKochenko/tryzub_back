const { Schema, model } = require("mongoose");

const emailRegEx = /^\S+@\S+\.\S+$/;

const bilingualStringSchema = Schema({
  ua: { type: String },
  en: { type: String, required: true },
});

const galleryItemSchema = Schema({
  thumb: { type: String },
  fullImg: { type: String },
});

const addressSchema = Schema({
  ua: { type: String },
  en: { type: String, required: true },
  gps: { type: String },
});

const contactsSchema = Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String, match: emailRegEx },
});

const eventSchema = Schema(
  {
    title: { type: bilingualStringSchema, required: true },
    announce: { type: bilingualStringSchema, required: true },
    description: { type: bilingualStringSchema, required: true },
    coverImg: { type: String, required: true },
    gallery: { type: [galleryItemSchema] },
    startDate: { type: Number, required: true },
    endDate: { type: Number },
    emphasize: { type: Boolean, default: false },
    show: { type: Boolean, default: true },
    address: { type: addressSchema, required: true },
    contacts: { type: contactsSchema },
  },
  { versionKey: false, timestamps: true }
);

const Event = model("events", eventSchema);

module.exports = Event;
