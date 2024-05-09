import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App() {
  const [temp, setTemp] = useState({
    id: 0,
    title: "",
  });
  const [activity, setActivity] = useState({
    id: 0,
    title: "",
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]) as any;

  const [activityList, setActivityList] = useState([
    ...(localStorage.getItem("activities")
      ? JSON.parse(localStorage.getItem("activities") as any)
      : []),
  ]);

  const handleFormOnChange = (event: any) => {
    const searched = event.target.value;
    setSearch(searched);
  };
  function handleSearch(event: any) {
    event.preventDefault();
    const searched = activityList.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(searched);
  }

  const saveActivity = () => {
    const found = activityList.find((it) => it.id == temp.id);
    const index = activityList.findIndex((it) => it.id == temp.id);
    if (found) {
      console.log("ketemu", temp);
      activityList.splice(index, 1, temp);
    } else {
      console.log("buat baru");
      setActivityList([...activityList, activity] as any);
    }
    setActivity({ id: 0, title: "" });
  };

  const deleteActivity = (id: number | any) => {
    const updatedActivities = activityList.filter(
      (activity) => activity.id !== id
    );
    setActivityList([...updatedActivities] as any);
  };

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activityList));
  }, [activityList]);

  //
  return (
    <>
      <div className="flex flex-col  items-center pt-10	 ">
        <h1 className="py-10">My Activity</h1>
        <div>
          <form onSubmit={handleSearch} action="post" className="inline-flex">
            <label htmlFor="q"></label>
            <Input
              placeholder="Search Activity"
              name="q"
              onChange={handleFormOnChange}
              value={search}
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="inline-flex">
          <label htmlFor="save"></label>
          <Input
            placeholder="New Activity"
            name="save"
            value={activity.title}
            onChange={(e) => {
              setActivity({ id: new Date().getTime(), title: e.target.value });
              setTemp({ id: temp.id, title: e.target.value });
            }}
          />
          <Button onClick={() => saveActivity()}>Save</Button>
        </div>

        <ul className="py-10">
          {activityList.map((activity) => (
            <li key={activity.id} className="flex gap-5 items-center">
              {activity.title}
              <Button onClick={() => deleteActivity(activity.id)}>
                Delete
              </Button>
              <Button
                onClick={() => {
                  setTemp(activity);
                  setActivity(activity);
                }}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
        <div className="py-10"> Searched activity</div>
        <ul>
          {filter.map((filter: any) => (
            <li key={filter.id} className=" flex gap-5 items-center">
              {filter.title}
              <Button onClick={() => deleteActivity(filter.id)}>Delete</Button>
              <Button
                onClick={() => {
                  setTemp(filter);
                  setActivity(filter);
                }}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
