import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { LiveStreamBannerInfo } from "../../services";

export type LiveStreamProps = {
	countdownMins: number;
	liveStreamDelayMinutes: number;
	isLive: boolean;
	event?: LiveStreamBannerInfo;
};

export function useLiveStreamProps(intervalMinutes?: number): LiveStreamProps {
	!intervalMinutes && (intervalMinutes = 1);

	const [countdownMins, setCountdownMins] = useState<number>();
	const [event, setEvent] = useState<LiveStreamBannerInfo>();
	const [isLive, setIsLive] = useState(false);
	const [liveStreamDelayMinutes, setLiveStreamDelayMinutes] = useState(0);

	const timer = useRef<NodeJS.Timer>();
	const shouldCountdown = useRef<boolean>();

	useEffect(() => {
		const fetchEvent = async () => {
			const rightnow = dayjs().utc();

			if (
				(!event && countdownMins === undefined) ||
				(!!event && rightnow.isAfter(event.EndDateTime))
			) {
				const res = await axios.get<LiveStreamBannerInfo[]>(
					"/api/get-livestream-banner",
					{
						params: { datetime: rightnow.toISOString() },
					}
				);

				if (res?.status !== 200 || !res.data.length) {
					setIsLive(false);
					setEvent(undefined);
					shouldCountdown.current = false;

					return;
				}

				const latestEvent = res.data[0];
				setEvent(latestEvent);

				const liveDelay = latestEvent.SSW_LiveStreamDelayMinutes ?? 0;
				!liveStreamDelayMinutes &&
					latestEvent.SSW_DelayedLiveStreamStart &&
					setLiveStreamDelayMinutes(liveDelay);
				const start = dayjs(latestEvent.StartDateTime).add(liveDelay, "minute");
				setCountdownMins(start.diff(rightnow, "minute"));

				shouldCountdown.current = true;
			}

			setIsLive(
				countdownMins <= 0 && !!event && rightnow.isBefore(event.EndDateTime)
			);
		};

		fetchEvent();
	}, [countdownMins]);

	useEffect(() => {
		if (!timer.current) {
			timer.current = setInterval(() => {
				setCountdownMins((countdownMins) =>
					shouldCountdown.current
						? countdownMins - intervalMinutes
						: countdownMins
				);
			}, intervalMinutes * 60 * 1000 || 60000);
		}

		return () => clearInterval(timer.current);
	}, [intervalMinutes]);

	return {
		countdownMins,
		liveStreamDelayMinutes,
		event,
		isLive,
	};
}
