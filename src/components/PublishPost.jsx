import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Dialog, Transition } from "@headlessui/react";
import { Eye, ImagePlus, PlusIcon } from "lucide-react";
import { toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [banner, setBanner] = useState(null);
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBanner(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const publishPost = () => {
    if (!title || !content || !banner) {
      toast.error("Please fill in all fields");
      return;
    }
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setTitle("");
      setContent("");
      setBanner(null);
      toast.success("Post published successfully");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">Create New Blog Post</h1>

        {/* Title Input */}
        <label className="block text-sm font-medium text-gray-600">Post Title</label>
        <input
          type="text"
          placeholder="Enter blog title"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Banner Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Banner Image</label>
          <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500">
            <ImagePlus className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {banner && (
            <img
              src={banner}
              alt="Preview"
              className="mt-2 rounded-xl w-full object-cover max-h-60 shadow-md"
            />
          )}
        </div>

        {/* SunEditor */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Post Content</label>
          <SunEditor
            height="300px"
            setContents={content}
            onChange={setContent}
            setOptions={{
              buttonList: [
                ["undo", "redo", "bold", "underline", "italic", "fontSize", "fontColor", "align", "list", "link", "image", "codeView"],
              ],
            }}
          />
        </div>

        {/* Preview Button */}
        <div className="flex justify-end gap-2">
            <button
              disabled={publishing}
                onClick={() => setPreviewOpen(true)}
              className="w-fit flex items-center gap-2 cursor-pointer text-center bg-gray-400 hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
            >
              <span className="text-sm">Preview</span>
              <Eye className="w-5 h-5" />
            </button>

            <button
              disabled={publishing}
              onClick={() => publishPost()}
              className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
            >
              {publishing ? (
                <VscLoading className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="text-sm">Publish</span>
                  <PlusIcon className="w-5 h-5" />
                </>
              )}
              </button>
        </div>
      </div>

      {/* Preview Modal */}
      <Transition appear show={previewOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setPreviewOpen(false)}>
          <Transition.Child
            as={React.Fragment}
            enter=""
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-6">
            <Transition.Child
              as="div"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-auto max-h-[90vh] p-6"
            >
              <Dialog.Title className="text-2xl font-bold mb-4 text-center text-gray-800">Post Preview</Dialog.Title>
              {banner && (
                <img
                  src={banner}
                  alt="Banner"
                  className="rounded-xl mb-6 w-full object-cover max-h-72 shadow"
                />
              )}
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <div
                className="prose max-w-none prose-blue prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              <div className="flex justify-end">
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
                >
                  Close
                </button>
              </div>

            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

  export default CreatePost;
