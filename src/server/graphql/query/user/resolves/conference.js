import Conference from 'Root/models/Conference';

export default async (parent, args, context) => {
  if (!context.req.session) {
    return [];
  }

  const conferences = [];

  const authors = await Conference.find({
    author: context.req.session.user,
    type: args.type || 2
  }).lean();

  conferences.push(...authors);

  return conferences;
};
