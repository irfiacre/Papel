
const adminChecking = async (req, res, next) => {
  if (!req.userData.is_admin) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: Only administrator is allowed to do this.',
    });
  }
  next();
};

export default adminChecking;
