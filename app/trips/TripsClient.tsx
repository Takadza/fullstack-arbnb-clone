'use client';

import { SafeReservations, SafeUser } from "../types"
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";
import ListingCard from "../components/listings/ListingCard";


interface TripsClientProps{
    reservations: SafeReservations[];
    currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations, currentUser
})  => {

    const router  = useRouter();
    const [deletingId, setDeletingId] =  useState("")

    const onCancel = useCallback((id: string ) =>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() =>{
            toast.success("Reservation cancelled");
            router.refresh();
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId("")
        });
    },[router])


  return (
    <Container>
        <Heading
        title="Trips"
        subtitle="Where you have been and where you are going "
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservations) => (
            <ListingCard
            key={reservations.id}
            data={reservations.listing}
            reservation={reservations}
            actionId={reservations.id}
            onAction={onCancel}
            disabled={deletingId === reservations.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
            />
          ))}

        </div>
    </Container>

  )
}

export default TripsClient