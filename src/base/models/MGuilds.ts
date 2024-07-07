import { model, Schema } from "mongoose";
import { SGuild } from "../schemas/SGuild.js";

export default model<SGuild>(
	"Guilds",
	new Schema<SGuild>(
		{
			id: {
				type: String,
				required: true,
				unique: true
			}
		},
		{
			timestamps: true, // This will automatically add the fields `createdAt` and `updatedAt` to the document.
			strict: true // This will make sure that the document will only contain the fields that are defined in the schema.
		}
	)
);

