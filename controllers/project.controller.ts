import { Request, Response } from 'express';
import Project from '../models/project.model';
import { handleError } from '../utils/error.utils';

const projectController = {
  createProject: async (req: Request, res: Response) => {
    try {
      const createdBy = req.user?._id;
      const { name, description, link, demo, event } = req.body;

      const newProject = new Project({
        name,
        description,
        link,
        demo,
        event,
        createdBy,
      });

      await newProject.save();
      return res
        .status(201)
        .json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
      handleError(res, error);
    }
  },

  getAllProjects: async (req: Request, res: Response) => {
    try {
      const projects = await Project.find().populate('event');
      return res.status(200).json(projects);
    } catch (error) {
      handleError(res, error);
    }
  },

  getProjectById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate('event');

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      return res.status(200).json(project);
    } catch (error) {
      handleError(res, error);
    }
  },

  updateProject: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const project = await Project.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      return res
        .status(200)
        .json({ message: 'Project updated successfully', project });
    } catch (error) {
      handleError(res, error);
    }
  },

  deleteProject: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findByIdAndDelete(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  },
};

export default projectController;
