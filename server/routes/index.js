import express from 'express';
import auth from '../helpers/auth';
import authRoutes from './auth/auth';
import productRoutes from './product/product';
import inventoryRoutes from './inventory/inventory';
import venueRoutes from './venue/venue';
import areaRoutes from './area/area';
import sectionRoutes from './section/section';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);

router.use('/products', auth.authenticate, productRoutes);

router.use('/inventory', auth.authenticate, inventoryRoutes);

router.use('/areas', auth.authenticate, areaRoutes);

router.use('/sections', auth.authenticate, sectionRoutes);

router.use('/venues', auth.authenticate, venueRoutes);

export default router;
