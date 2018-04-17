import Conference from 'Root/models/Conference';

export default async (parent, args, context) => {
  let conference;

  if (args.type === 1) {
    if (context.req.session.user) {
      conference = await Conference.find({
        type: 1,
      })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();
    } else {
      conference = [];
    }
  } else {
    conference = await Conference.find({
      type: 2,
    })
    .sort({ createdAt: -1 })
    .select('-__v')
    .lean();
  }

  return conference;
};
