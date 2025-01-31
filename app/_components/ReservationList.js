'use client';

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservetion } from "../_lib/actions";

function ReservationList({bookings}) {
    const [optmisticBookings, optmisticDelete] = useOptimistic(bookings, (curBookings, bookingId) => {
        return curBookings.filter(booking => booking.id !== bookingId);
    });

    async function handleDelete(bookingId){
        optmisticDelete(bookingId)
        await deleteReservetion(bookingId);
    }

    return (
        <ul className="space-y-6">
          {optmisticBookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete}/>
          ))}
        </ul>
    )
}

export default ReservationList
