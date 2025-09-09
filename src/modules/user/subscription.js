import { subscribe } from "graphql";
import { pubsub } from "../../server/pubsub.js";

export const userSubscriptionResolver = {
    userOnline: {
        subscribe: () => pubsub.asyncIterableIterator(["USER_ONLINE"])
    }, 

    userOffline: {
        subscribe: () => pubsub.asyncIterableIterator(["USER_OFFLINE"])
    }
}; 