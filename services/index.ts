import axios, { AxiosResponse } from "axios";

export const createLead = async (data: BookingFormSubmissionData) => {
	return await axios.post(
		"https://www.ssw.com.au/ssw/api/crm/createlead",
		data,
		{
			headers: { "Content-Type": "application/json" },
		}
	);
};

export const getLiveStreamBannerInfo = async (datetime: string) => {
	const odataFilter = `$filter=Enabled ne false \
and EndDateTime ge datetime'${datetime}'\
and CalendarType eq 'User Groups'\
&$orderby=StartDateTime asc\
&$top=1`;

	return await axios.get<LiveStreamBannerInfo[]>(
		"https://ssw.com.au/ssw/SharePointEventsService.aspx",
		{
			params: { odataFilter: encodeURIComponent(odataFilter) },
		}
	);
};

export const getUpcomingEvents = async (datetime: string, top: number) => {
	const odataFilter = `$filter=Enabled ne false \
and EndDateTime gt datetime'${datetime}'\
&$orderby=StartDateTime asc\
&$top=${top}`;

	const res = await axios.get<EventInfo[]>(
		"https://ssw.com.au/ssw/SharePointEventsService.aspx",
		{
			params: { odataFilter: encodeURIComponent(odataFilter) },
		}
	);

	return res;
};

export const getLiveStreamWidgetInfo = async (eventId: string) => {
	const odataFilter = `$filter=Id eq ${eventId}\
&$orderby=StartDateTime asc\
&$top=1\
&$select=*,InternalPresenters/EMail&$expand=InternalPresenters/Id`;

	const eventsRes = await axios.get<LiveStreamWidgetInfo[]>(
		"https://ssw.com.au/ssw/SharePointEventsService.aspx",
		{
			params: { odataFilter: encodeURIComponent(odataFilter) },
		}
	);

	const event = eventsRes.data?.length ? eventsRes.data[0] : null;

	const eventRes: AxiosResponse<LiveStreamWidgetInfo> = {
		...eventsRes,
		data: {
			...event,
			ChannelId: "UCBFgwtV9lIIhvoNh0xoQ7Pg", // hard coded for now
		},
	};

	return eventRes;
};

export const getSpeakersInfo = async (ids?: string[], emails?: string[]) => {
	const speakers: SpeakerInfo[] = [];

	if (ids?.length) {
		const externalSpeakerFilter = `$filter=${ids
			.map((id) => `Id eq ${id}`)
			.join(" or ")}`;

		const externalSpeakersRes = await axios.get<SpeakerInfo[]>(
			"https://ssw.com.au/ssw/SharePointExternalSpeakersService.aspx",
			{
				params: { odataFilter: encodeURIComponent(externalSpeakerFilter) },
			}
		);

		externalSpeakersRes.status === 200 &&
			speakers.push(...externalSpeakersRes.data);
	}

	if (emails?.length) {
		await Promise.all(
			emails.map(async (email) => {
				const internalSpeakerRes = await axios.get<InternalSpeakerInfo>(
					"https://ssw.com.au/ssw/CRMService.aspx",
					{
						params: { odata: encodeURIComponent(email) },
					}
				);

				if (internalSpeakerRes.status === 200 && internalSpeakerRes.data) {
					const internalSpeaker = internalSpeakerRes.data;
					speakers.push({
						Title: internalSpeaker.Nickname
							? `${internalSpeaker.FirstName} (${internalSpeaker.Nickname}) ${internalSpeaker.LastName}`
							: `${internalSpeaker.FirstName} ${internalSpeaker.LastName}`,
						PresenterProfileImage: {
							Url: internalSpeaker.PhotoURL,
						},
						PresenterShortDescription: internalSpeaker.ShortDescription,
						PresenterProfileLink: internalSpeaker.ProfileURL,
					});
				}
			})
		);
	}

	return speakers;
};

export type BookingFormSubmissionData = {
	Name: string;
	Topic: string;
	Company: string;
	Country: string;
	State: string;
	Email: string;
	Phone: string;
	Recaptcha: string;
	SourceWebPageURL: string;
	EmailSubject: string;
	EmailBody: string;
	Note?: string | null;
};

export interface LiveStreamBannerInfo {
	Id: string;
	StartDateTime: Date;
	EndDateTime: Date;
	StartShowBannerDateTime: Date;
	EndShowBannerDateTime: Date;
	Title: string;
	FormattedDate: string;
	RelativeDate: string;
	SSW_DelayedLiveStreamStart?: boolean;
	SSW_LiveStreamDelayMinutes?: number;
}

export interface EventInfo extends LiveStreamBannerInfo {
	Url: {
		Description: string;
		Url: string;
	};
	Thumbnail: {
		Description: string;
		Url: string;
	};
	Presenter: string;
}

export interface LiveStreamWidgetInfo extends LiveStreamBannerInfo {
	YouTubeId: string;
	ChannelId: string;
	EventDescription: string;
	EventShortDescription: string;
	Presenter: string;
	ExternalPresentersId: {
		results?: string[];
	};
	InternalPresenters: {
		results?: {
			EMail: string;
		}[];
	};
	PresenterProfileUrl: {
		Url: string;
	};
}

export interface SpeakerInfo {
	Title: string;
	PresenterProfileLink: string;
	PresenterProfileImage?: {
		Url: string;
	};
	PresenterShortDescription?: string;
}

export interface InternalSpeakerInfo {
	FirstName: string;
	LastName: string;
	Nickname: string;
	PhotoURL: string;
	GitHubURL: string;
	ProfileURL: string;
	ShortDescription: string;
}
