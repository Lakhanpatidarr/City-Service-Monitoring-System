const Rating = require("../models/Rating");


exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, zone } = req.body;
        if (!rating || !zone) {
            return res.status(400).json({
                success: false,
                message: "All fields required",
            });
        }
        const alreadyRated = await Rating.findOne({ user: userId, zone: zone });
        if (alreadyRated) {
            return res.status(403).json({
                success: false,
                message: "You have already rated this zone",
            });
        }
        const newRating = await Rating.create({ user: userId, zone, rating });
        return res.status(201).json({
            success: true,
            message: "Rating submitted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating rating",
        });
    }
};

exports.getThreeTopRating = async (req, res) => {
    try {
        const topZones = await Rating.aggregate([
            {
                $match: {
                    zone: { $exists: true, $ne: null },
                    rating: { $exists: true, $ne: null }
                }
            },
            {
                $group: {
                    _id: "$zone",
                    avgRating: { $avg: { $toDouble: "$rating" } },
                },
            },
            {
                $sort: { avgRating: -1 },
            },
            {
                $limit: 3,
            },
        ]);
        return res.status(200).json({
            success: true,
            data: topZones,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching top rated zones",
        });
    }
};


exports.getZoneAndRating = async (req, res) => {
    try {
        const data = await Rating.aggregate([
            {
                $group: {
                    _id: "$zone",
                    rating: { $avg: "$rating" },
                },
            },
            {
                $project: {
                    _id: 0,
                    zone: "$_id",
                    rating: { $round: ["$rating", 1] },
                },
            },
            {
                $sort: { rating: -1 },
            },
        ]);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching zone ratings",
        });
    }
};  