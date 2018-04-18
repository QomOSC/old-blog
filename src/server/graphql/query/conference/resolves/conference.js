import Conference from 'Root/models/Conference';

export default async (parent, args) => {
  try {
    const conference = await Conference.findOne({
      type: args.type || 2,
      _id: args._id
    });

    return conference;
  } catch (e) {
    return {};
  }
};
