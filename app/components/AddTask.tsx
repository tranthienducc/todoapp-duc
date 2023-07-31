"use client";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEvent, useState } from "react";
import axios from "axios";
import { ITodos } from "@/models";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [todos, setTodos] = useState<ITodos[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: name,
      priority: priority,
    };

    try {
      const res = await axios.post("/api/posts", data);

      if (res.status === 201) {
        alert("Task created successfully!");

        setTodos([...todos, res.data]);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
    setName("");
    setPriority("");
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full btn btn-primary"
      >
        Add new task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold">Add new task</h3>
          <div className="modal-action">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Type here"
              className="w-full input input-bordered"
            />
            <input
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              type="text"
              placeholder="Type here"
              className="w-full input input-bordered"
            />
            <button
              type="submit"
              className="btn"
              onClick={() => setModalOpen(false)}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
