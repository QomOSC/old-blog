import Conference from 'Root/models/Conference';

export default async (parent, args, context) =>
  context.req.session ?
    await Conference
      .find({ author: context.req.session.user, type: args.type || 2 })
      .sort({ createdAt: -1 })
      .lean() :
    [];
