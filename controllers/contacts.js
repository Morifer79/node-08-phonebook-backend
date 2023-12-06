import { Contact } from '../models/contact.js';
import { HttpError } from '../helpers/HttpError.js';
import { ctrlWrapper } from '../helpers/ctrlWrapper.js';

export const getContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.find(
    { owner },
    '-createdAt -updatedAt'
  ).populate('owner');
  res.json(result);
};

export const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

export const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id, owner);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: 'contact deleted' });
};

export default {
  getContacts: ctrlWrapper(getContacts),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
};
