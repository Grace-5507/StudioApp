import React from "react";
import { shallow } from "enzyme";
import { render, waitFor } from "@testing-library/react";
import Home from "../../pages/home/Home";
import Users from "../../pages/users/Users";
import Albums from "../../pages/albums/Albums";
import Photos from "../../pages/photos/Photos";

describe("Home", () => {
  it("displays the correct number of albums for each user", () => {
    const wrapper = shallow(<Home />);
    const users = wrapper.state().users;
    expect(users).toHaveLength(3);
    expect(wrapper.find(".albums").at(0).text()).toEqual("5 albums");
    expect(wrapper.find(".albums").at(1).text()).toEqual("10 albums");
    expect(wrapper.find(".albums").at(2).text()).toEqual("7 albums");
  });

  it("makes a GET request to retrieve the users", () => {
    const wrapper = shallow(<Home />);
    const spy = jest.spyOn(wrapper.instance(), "getUsers");
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it("makes a GET request to retrieve the albums for each user", () => {
    const wrapper = shallow(<Home />);
    const spy = jest.spyOn(wrapper.instance(), "getAlbums");
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalledWith(1);
    expect(spy).toHaveBeenCalledWith(2);
    expect(spy).toHaveBeenCalledWith(3);
  });
});


describe("Users", () => {
  it("displays the correct user information", () => {
    const wrapper = shallow(<User match={{ params: { id: 1 } }} />);
    const user = wrapper.state().user;
    expect(user.id).toEqual(1);
    expect(user.name).toEqual("John Doe");
    expect(user.email).toEqual("john.doe@example.com");
    expect(wrapper.find(".name").text()).toEqual("John Doe");
    expect(wrapper.find(".email").text()).toEqual("john.doe@example.com");
  });

  it("displays the correct number of albums for the selected user", () => {
    const wrapper = shallow(<User match={{ params: { id: 1 } }} />);
    const albums = wrapper.state().albums;
    expect(albums).toHaveLength(5);
    expect(wrapper.find(".album").at(0).text()).toEqual("Album 1");
    expect(wrapper.find(".album").at(1).text()).toEqual("Album 2");
    expect(wrapper.find(".album").at(2).text()).toEqual("Album 3");
    expect(wrapper.find(".album").at(3).text()).toEqual("Album 4");
    expect(wrapper.find(".album").at(4).text()).toEqual("Album 5");
  });

  it("makes a GET request to retrieve the selected user", () => {
    const wrapper = shallow(<User match={{ params: { id: 1 } }} />);
    const spy = jest.spyOn(wrapper.instance(), "getUser");
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it("makes a GET request to retrieve the albums for the selected user", () => {
    const wrapper = shallow(<User match={{ params: { id: 1 } }} />);
    const spy = jest.spyOn(wrapper.instance(), "getAlbums");
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalledWith(1);
  });
});

jest.mock("axios");

describe("Albums", () => {
  it("displays the correct album information and number of photos", async () => {
    const album = { id: 1, name: "Album 1" };
    const photos = [
      { id: 1, title: "Photo 1", url: "http://example.com/1.jpg" },
      { id: 2, title: "Photo 2", url: "http://example.com/2.jpg" },
    ];
    axios.get
      .mockResolvedValueOnce({ data: album })
      .mockResolvedValueOnce({ data: photos });

    const { getByText } = render(<AlbumPage albumId={album.id} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`/api/albums/${album.id}`);
      expect(axios.get).toHaveBeenCalledWith(`/api/albums/${album.id}/photos`);
      expect(getByText(album.name)).toBeInTheDocument();
      expect(getByText(`${photos.length} Photos`)).toBeInTheDocument();
    });
  });
});
