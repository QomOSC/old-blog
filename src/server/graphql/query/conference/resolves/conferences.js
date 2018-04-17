import Conference from 'Root/models/Conference';

export default async (parent, args) => {
  const conference = await Conference.find({
    type: args.type || 2,
  });

  return conference;
};
