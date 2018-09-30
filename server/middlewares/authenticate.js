module.exports = {
    auth: async (ctx, next, customAuth) => {
      if (!ctx.session.user ||  customAuth && customAuth(ctx)) {
        ctx.body = {
          errcode: 1041,
          errmsg:'请登录'
        };
        return false
      }
      return true
    }
  };
  