const UserLibrary = require("../../models/UserLibraryModel");

async function createLibrary(request, response) {
  try {
    const payload = request.payload;
    const email = payload.email;
    const title = request.body.title || null;
    const visibility = request.body.visibility || "private";
    const thumbnail = request.body.thumbnail || null
    if (title == null || title.length == 0) {
      return response.json({ code: 0, message: "Invalid library title" });
    }
    if (
      visibility == null ||
      visibility.length == 0 ||
      (visibility != "public" && visibility != "private")
    ) {
      return response.json({
        code: 0,
        message:
          "Invalid visibility option. Please select either 'public' or 'private'.",
      });
    }
    if (thumbnail == null || thumbnail.length == 0) {
      return response.json({ code: 0, message: "Please provide thumbnail image for library" });
    }
    const library = new UserLibrary({
      title: title,
      visibility: visibility.toLowerCase(),
      userEmail: email,
    });
    const result = await library.save();
    return response.json({
      code: 1,
      message: "Library Created",
      libraryId: result._id.toString(),
    });
  } catch (err) {
    console.log("Caught error in creating library: " + err.message);
    if (err.message.includes("title_1 dup key")) {
      return response.json({
        code: 0,
        message: "Library title is already taken.",
      });
    }
    return response.json({ code: -1, message: "Failed to create library" });
  }
}

async function getLibraryList(request, response) {
  try {
    const payload = request.payload;
    const email = payload.email;
    const list = await UserLibrary.find({ userEmail: email }) || null;
    return response.json({ code: 1, data: list });
  } catch (err) {
    console.log("Caught error in getting library list: " + err.message);
    return response.json({ code: -1, message: "Failed to create library" });
  }
}

module.exports = {
  createLibrary,
  getLibraryList,
};
