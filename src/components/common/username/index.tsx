import React from "react";
import { useSelector } from "react-redux";
import { meSelector } from "@stores/me";

export default function Username() {
  const { firstName,lastName, email } = useSelector(meSelector);

  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-lg font-semibold text-gray-800">{firstName} {lastName}</span>
      <span className="text-sm text-blue-600">{email}</span>
    </div>
  );
}
