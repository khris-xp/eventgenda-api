import { Request, Response } from 'express';
import Project from '../models/project.model';
import { handleError } from '../utils/error.utils';
import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';
import projectRepository from '../repositories/project.repositories';
import eventRepository from '../repositories/event.repository';

const projectController = {
  createProject: async (req: Request, res: Response) => {
    try {
      const createdBy = req.user?._id;
      const eventId = req.params.eventId;

      const project = await projectRepository.createProject({
        ...req.body,
        createdBy,
        event: eventId,
      });

      if (!project) {
        return errorResponseStatus(400, res, "Create project failed", null);
      }

      const event = await eventRepository.getEventById(eventId);
      if (!event) {
        return errorResponseStatus(404, res, "Event not found", null);
      }

      event.projects.push(project._id);
      await event.save();

      return successResponseStatus(res, "Project created successfully", project);
    } catch (error) {
      handleError(res, error);
    }
  },

  getAllProjects: async (req: Request, res: Response) => {
    try {
      const projects = await projectRepository.findAllProjects();
      return successResponseStatus(res, "Projects retrieved successfully", projects);
    } catch (error) {
      handleError(res, error);
    }
  },

  getProjectById: async (req: Request, res: Response) => {
    try {
      const project = await projectRepository.findProjectById(req.params.id);

      if (!project) {
        return errorResponseStatus(404, res, "Project not found", null);
      }

      return successResponseStatus(res, "Project retrieved successfully", project);
    } catch (error) {
      handleError(res, error);
    }
  },

  updateProject: async (req: Request, res: Response) => {
    try {
      const project = await projectRepository.updateProject(req.params.id, req.body);
      if (!project) {
        return errorResponseStatus(404, res, "Project not found", null);
      }

      return successResponseStatus(res, "Project updated successfully", project);
    } catch (error) {
      handleError(res, error);
    }
  },

  deleteProject: async (req: Request, res: Response) => {
    try {
      const project = await projectRepository.deleteProject(req.params.id);
      if (!project) {
        return errorResponseStatus(404, res, "Project not found", null);
      }

      return successResponseStatus(res, "Project deleted successfully", null);
    } catch (error) {
      handleError(res, error);
    }
  },
};

export default projectController;
