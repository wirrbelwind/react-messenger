import { Message } from "entities/messages";
import { doc, DocumentReference, Timestamp } from "firebase/firestore";
import { db, getUser } from "shared/firebase";
import { IMessage } from "shared/libs/types";
