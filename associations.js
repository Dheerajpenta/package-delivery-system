// models
const User =  require("./models/user");
const Package =  require("./models/package");
const Payment =  require("./models/payment");
const Tracking =  require("./models/tracking");
const Coupon =  require("./models/coupon");
const Feedback = require("./models/feedback");


// function to set associations
exports.setAssociations = () => {

    // defining relation between user and package models
    User.hasMany(Package, { onDelete: 'CASCADE' });
    Package.belongsTo(User);

    // defining relation between package and coupon models
    Coupon.hasMany(Package);
    Package.belongsTo(Coupon);

    // defining relation between package and payment models
    Payment.hasOne(Package);
    Package.belongsTo(Payment);

    // defining relation between user and payment models
    User.hasMany(Payment, { onDelete: 'CASCADE' });
    Payment.belongsTo(User);

    // defining relation between package and tracking models
    Package.hasOne(Tracking);
    Tracking.belongsTo(Package);

    // defining relation between payment and tracking models
    Payment.hasOne(Tracking);
    Tracking.belongsTo(Payment);

    // defining relation between user and tracking models
    User.hasMany(Tracking, { onDelete: 'CASCADE' });
    Tracking.belongsTo(User);

    // defining relation between user and tracking models
    User.hasMany(Feedback);
    Feedback.belongsTo(User);
};