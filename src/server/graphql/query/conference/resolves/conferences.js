import Conference from 'Root/models/Conference';
import User from 'Root/models/User';

export default async (parent, args, context) => {
  let conference;

  if (args.type === 1) {
    if (context.req.session.user) {
      const user = await User.findById(context.req.session.user);

      if (user.type > 2) {
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
