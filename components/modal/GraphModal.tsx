import React, { use, useEffect, useState } from "react";
import Filter from "../filter/Filter";
import Graph from "./Graph";
import useBookmakerApi from "@/hooks/useBookmakerApi";
import { CloseButton } from "./CloseButton";
import { ChartData } from "@/utils/types";
import returnChartData from "@/utils/returnChartData";

export default function Modal(props: {
  active: boolean;
  deactivate: () => void;
  bookmaker_id: number;
  fixture_id: number;
}) {
  const { active, deactivate, bookmaker_id, fixture_id } = props;
  const [filter, setFilter] = useState("Win Draw Loss");
  const [chartData, setChartData] = useState<ChartData>({
    overUnder0Point5Data: [],
    overUnder1Point5Data: [],
    overUnder2Point5Data: [],
    winLossDrawData: [],
  });

  const { isLoading, isError, error } = useBookmakerApi(
    fixture_id,
    bookmaker_id,
    setChartData
  );

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 ${
        !active && "hidden"
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex justify-center items-center bg-gray-900 bg-opacity-50`}
    >
      <div className="relative w-full max-w-5xl max-h-full">
        <div className="relative bg-white rounded-lg shadow min-w-full">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <div className="w-1/3 min-w-[240px]">
              {
                // If chart data has any keys which are not empty arrays, then render the filter
                Object.keys(chartData).some(
                  (key) => chartData[key].length > 0
                ) && (
                  <Filter
                    options={{
                      values: [
                        chartData.winLossDrawData.length > 0
                          ? "Win Draw Loss"
                          : undefined,
                        chartData.overUnder0Point5Data.length > 0
                          ? "Over Under 0.5 Goals"
                          : undefined,
                        chartData.overUnder1Point5Data.length > 0
                          ? "Over Under 1.5 Goals"
                          : undefined,
                        chartData.overUnder2Point5Data.length > 0
                          ? "Over Under 2.5 Goals"
                          : undefined,
                      ],

                      setter: (value) => setFilter(value),
                    }}
                    title={filter}
                  />
                )
              }
            </div>

            <CloseButton deactivate={deactivate} />
          </div>
          <div className="p-6 space-y-6">
            {isLoading && (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-t-2 border-gray-900 rounded-full animate-spin"></div>
              </div>
            )}
            {isError && (
              <div className="flex items-center justify-center">
                <div className="text-red-500">{error}</div>
              </div>
            )}
            {
              // If chart data has any keys which are not empty arrays, then render the graph
              Object.keys(chartData).some(
                (key) => chartData[key].length > 0
              ) && <Graph data={returnChartData(chartData, filter)} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
