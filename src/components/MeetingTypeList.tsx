"use client";
import ReactDatePicker from "react-datepicker";
import { useEffect, useState, type ReactElement } from "react";
import { HomeCard } from "./HomeCard";
import { useRouter } from "next/navigation";
import { MeetingModal } from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export interface MeetingTypeListProps {}

export function MeetingTypeList({}: MeetingTypeListProps): ReactElement {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isSchedulingMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    lik: "",
  });

  const [details, setDetails] = useState<Call>();

  const { toast } = useToast();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "please select a date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created",
      });
    } catch (e) {
      /* handle error */
      toast({
        title: "Failed to crate the meeting",
        variant: "destructive",
      });
    }
  };

  const homeBoxes = [
    {
      title: "New Meeting",
      subtitle: "Start an instant meeting",
      imageUrl: "/icons/add-meeting.svg",
      bg: "bg-orange-1",
      handleClick: () => setMeetingState("isInstantMeeting"),
    },
    {
      title: "Join Meeting",
      subtitle: "via invitation link",
      imageUrl: "/icons/join-meeting.svg",
      bg: "bg-blue-1",
      handleClick: () => setMeetingState("isJoiningMeeting"),
    },
    {
      title: "Schedule Meeting",
      subtitle: "Plan your meeting",
      imageUrl: "/icons/schedule.svg",
      bg: "bg-purple-1",
      handleClick: () => setMeetingState("isSchedulingMeeting"),
    },
    {
      title: "View Recordings",
      subtitle: "Meetings Recordings",
      imageUrl: "/icons/Video.svg",
      bg: "bg-yellow-1",
      handleClick: () => router.push("/recordings"),
    },
  ];

  useEffect(() => {
    console.log(meetingState);
  }, [meetingState]);

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${details?.id}`;

  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {homeBoxes.map((box) => (
          <HomeCard {...box} key={box.title} />
        ))}
        {!details ? (
          <MeetingModal
            isOpen={meetingState === "isSchedulingMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}
          >
            <div className="flex flex-col gap-2.5 ">
              <label className="text-base text-normal leading-[22px] text-sky-2">
                Add a description
              </label>
              <Textarea
                className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => {
                  setValues({ ...values, description: e.target.value });
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px] text-sky-2">
                Select Date and Time
              </label>
            </div>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </MeetingModal>
        ) : (
          <MeetingModal
            isOpen={meetingState === "isSchedulingMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Created"
            className="text-center"
            buttonText="Copy Meeting Link"
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({ title: "Link copied" });
            }}
            image="/icons/checked.svg"
            buttonIcon="/icons/copy.svg"
          />
        )}

        <MeetingModal
          isOpen={meetingState === "isJoiningMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Type the link here"
          className="text-center"
          buttonText="Join Meeting"
          handleClick={() => router.push(values.lik)}
        >
          <Input
            placeholder="Meeting link"
            onChange={(e) => setValues({ ...values, lik: e.target.value })}
            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </MeetingModal>

        <MeetingModal
          isOpen={meetingState === "isInstantMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Start an Instant Meeting"
          className="text-center"
          buttonText="Start Meeting"
          handleClick={createMeeting}
        />
      </section>
    </>
  );
}
