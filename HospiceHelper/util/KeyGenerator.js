class KeyGenerator {

    //static method to generate keys for family to join care team
    static generateFamilyJoinKey(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            key += characters.charAt(randomIndex);
        }
        return key;
    }

    static async generateSchemaId(schemaName, Model, length = 8) {
        console.log(`[KeyGenerator] Starting ID generation for schema: ${schemaName}`);
        const prefix = schemaName.slice(0, 2).toUpperCase(); // First two letters of schema
        let id = '';

        do {
            const uniquePart = this.generateFamilyJoinKey(length);
            id = `${prefix}${uniquePart}`; // e.g., "US234hdjsj"
        } while (await this.isKeyPresent(id, Model)); // Keep generating if the ID already exists

        return id;
    }

    // Method to check if the ID is already present in the DB
    static async isKeyPresent(id, Model) {
        const record = await Model.findOne({ id }); // Assuming 'id' is the field name
        return !!record; // Return true if record exists, false otherwise
    }


}

module.exports = KeyGenerator;