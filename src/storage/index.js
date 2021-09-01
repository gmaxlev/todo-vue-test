import ClientStorage from "./client-storage/client-storage";
import LocalStorageClientStorageDriver from "./local-storage/local-storage-client-storage-driver";

/**
 * It is a universal data storage
 */
export default new ClientStorage(new LocalStorageClientStorageDriver());
