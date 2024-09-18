import { CreateProjectDto, UpdateProjectDto } from '../common/dto/project.dto'; 
import Project from '../models/project.model';  
import { ProjectDocument } from '../types/project';  

const projectRepository = {

  createProject: async (projectData: CreateProjectDto): Promise<ProjectDocument> => {
    const project = new Project(projectData);
    return await project.save();
  },

  findAllProjects: async (): Promise<ProjectDocument[]> => {
    return await Project.find().populate('event').exec();
  },


  findProjectById: async (id: string): Promise<ProjectDocument | null> => {
    return await Project.findById(id).populate('event').exec();
  },


  updateProject: async (id: string, projectData: UpdateProjectDto): Promise<ProjectDocument | null> => {
    return await Project.findByIdAndUpdate(id, projectData, { new: true }).exec();
  },


  deleteProject: async (id: string): Promise<ProjectDocument | null> => {
    return await Project.findByIdAndDelete(id).exec();
  },
};

export default projectRepository;
