import Conference from 'Root/models/Conference';

export default async (parent, args) => {
  const conference = await Conference.findOne({
    type: args.type || 2,
    _id: args._id
  });

  return conference;
};
