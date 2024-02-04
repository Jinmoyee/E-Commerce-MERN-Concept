import Listing from "../models/listing.model.js"

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
        return next(errorHandeler(404, "Listing not found!"))
    }
    if (listing.userRef !== req.user.id) {
        return next(errorHandeler(403, "You can only delete your own listings!"))
    }
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("Listing has been deleted!")
    } catch (error) {
        next(error)
    }
}