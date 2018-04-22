import Conference from 'Root/models/Conference';

export default async (parent, args) => await Conference
  .findOne({ type: args.type || 2, _id: args._id })
  .lean();
