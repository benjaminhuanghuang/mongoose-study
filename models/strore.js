const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // tell mongoose use Promise provide by node.js
const slug = require('slugs'); //convert them to URL-friendly chars


const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Please enter a store name!"
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        address: {
            type: 'String',
            required: 'You must supply an address!'
        }
    },
    photo: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an author'
    }
}, {
    toJSON: {
        virtuals: true
    }
});

// Define indexes
// Define our indexes
storeSchema.index({
    name: 'text',
    description: 'text'
});

storeSchema.index({
    location: '2dsphere'
});

storeSchema.pre('save', async function (next) {
    if (!this.isModified('name')) {
        next();
        return;
    }
    this.slug = slug(this.name);

    //find other stores that have a slug of ...
    const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$))$`, 'i');
    const storeWithSlug = await this.constructor.find({
        slug: slugRegex
    });

    if (storeWithSlug.length) {
        this.slug = `${this.slug}-${this.storeWithSlug.length + 1}`;
    }
    next();
});

storeSchema.statics.getTagsList = function () {
    return this.aggregate([{
            $unwind: '$tags'
        },
        {
            $group: {
                _id: '$tags',
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ]);
}

// find the reviews where the stores._id === review.store
storeSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id', // which field on store
    foreignField: 'store' // which field on the review
})

storeSchema.statics.getTopStores = function () {
    return this.aggregate([
        // Lookup Stores and populate their reviews
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'store',
                as: 'reviews'
            }
        },
        // filter for only items that have 2 or more reviews
        {
            $match: {
                'reviews.1': { // means reviews[1]
                    $exists: true
                }
            }
        },
        // Add the average reviews field
        {
            $project: {
                photo: '$$ROOT.photo', // $$ROOT means result document
                name: '$$ROOT.name',
                reviews: '$$ROOT.reviews',
                slug: '$$ROOT.slug',
                averageRating: {
                    $avg: '$reviews.rating' // $reviews created by $lookup
                }
            }
        },
        // sort it by our new field, highest reviews first
        {
            $sort: {
                averageRating: -1
            }
        },
        // limit to at most 10
        {
            $limit: 10
        }
    ]);
}

function autopopulate(next) {
    this.populate('reviews');
    next();
}

storeSchema.pre('find', autopopulate);
storeSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Store', storeSchema);