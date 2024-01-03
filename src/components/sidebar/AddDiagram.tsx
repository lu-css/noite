'use client'

import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect, useRef  } from "react";
import { Item } from "./sidebarItem";
import { BsFillDiagram3Fill } from "react-icons/bs";
import { BsHddNetwork } from "react-icons/bs";

export const AddDiagram = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const myDialog = modalRef.current;

    if (myDialog && modalOpen) {
      myDialog.showModal();
    }
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex relative justify-center items-center">
      <button
        onClick={openModal}
        className="flex z-[2] justify-center w-full rounded-md hover:bg-blue-600/90 transition-all cursor-pointer bg-blue-500/90 gap-4 items-center py-4 "
      >
       <FaPlus className='text-xl'></FaPlus>Novo Diagrama{" "}
      </button>
      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Escolha o seu Diagrama</h3>
          <div className="flex flex-col mt-4 gap-2">
            
            <Item
              name="DER (Diagrama de Entidade Relacionamento)"
              icon={<BsFillDiagram3Fill />}
              link="/boards/local"
            />
            <Item
              name="Infraestrutura (Infra)"
              icon={<BsHddNetwork></BsHddNetwork> }
              link='/boards/local'
            />
          </div>
        </div>
      </dialog>
    </div>
  );
};
