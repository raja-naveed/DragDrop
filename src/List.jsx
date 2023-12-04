import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function List() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const querySnapshot = await getDocs(collection(db, "user"));
                const documents = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sorting the documents based on the 'sequence' field
                const sortedDocuments = documents.sort((a, b) => a.sequence - b.sequence);

                setData(sortedDocuments);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update state to reflect the new order
        setData(items);

        try {
            for (let i = 0; i < items.length; i++) {
                const docRef = doc(db, "user", items[i].id); // Assuming "id" is the unique identifier for your documents
                await updateDoc(docRef, { sequence: i }); // Updating a field called "sequence" with the new index
            }

            console.log("Firestore updated successfully!");
        } catch (error) {
            console.error("Error updating Firestore:", error);
        }
    };

    return (
        <div className="mx-auto container">
            <div className="w-[80%] ">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-list">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                role="list"
                                className="divide-y divide-gray-100"
                            >
                                {data.map((person, index) => (
                                    <Draggable key={person.email} draggableId={person.email} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex justify-between gap-x-6 py-5"
                                            >
                                                <div className="flex min-w-0 gap-x-4">
                                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.url} alt="" />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">{person.position}</p>

                                                </div>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default List;
