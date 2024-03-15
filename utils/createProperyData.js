import { propertyCreateModel } from "@/models/propertyCreateModel";

export function createProperyData(formData, userId, images) {

    propertyCreateModel.owner = userId;
    propertyCreateModel.type = formData.get('type');
    propertyCreateModel.name = formData.get('name');
    propertyCreateModel.description = formData.get('description');
    propertyCreateModel.location.city = formData.get('location.city');
    propertyCreateModel.location.state = formData.get('location.state');
    propertyCreateModel.location.street = formData.get('location.street');
    propertyCreateModel.location.zipcode = formData.get('location.zipcode');
    propertyCreateModel.beds = formData.get('beds');
    propertyCreateModel.baths = formData.get('baths');
    propertyCreateModel.square_feet = formData.get('square_feet');
    propertyCreateModel.amenities = formData.getAll('amenities');
    propertyCreateModel.rates.monthly = formData.get('rates.monthly');
    propertyCreateModel.rates.nightly = formData.get('rates.nightly');
    propertyCreateModel.rates.weekly = formData.get('rates.weekly');
    propertyCreateModel.seller_info.name = formData.get('seller_info.name');
    propertyCreateModel.seller_info.email = formData.get('seller_info.email');
    propertyCreateModel.seller_info.phone = formData.get('seller_info.phone');
    propertyCreateModel.images = images;

    return propertyCreateModel;
}