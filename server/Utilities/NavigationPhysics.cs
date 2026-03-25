using System;

namespace VisionMasterH.Api.Utilities;

/// <summary>
/// Provides pure mathematical functions for absolute global navigation vectors.
/// Adheres strictly to the Single Responsibility Principle by isolating math logic
/// from network and DI layers.
/// </summary>
public static class NavigationPhysics
{
    private const double RadToDeg = 180.0 / Math.PI;

    /// <summary>
    /// Calculates Speed Over Ground (SOG) using absolute velocity vectors.
    /// Formula: SOG = sqrt(V_N^2 + V_E^2)
    /// </summary>
    public static double CalculateSog(double vn, double ve)
    {
        return Math.Sqrt((vn * vn) + (ve * ve));
    }

    /// <summary>
    /// Calculates Course Over Ground (COG) and normalizes strictly to [0, 360).
    /// Formula: COG = atan2(V_E, V_N) * (180 / PI)
    /// </summary>
    public static double CalculateCog(double vn, double ve)
    {
        double cog = Math.Atan2(ve, vn) * RadToDeg;
        // Normalize to strictly 0 - 360 range
        cog = cog % 360.0;
        if (cog < 0)
        {
            cog += 360.0;
        }
        return cog;
    }

    /// <summary>
    /// Calculates Leeway Angle (Side slip) Beta without current.
    /// Beta = COG - HDG
    /// Result is normalized to [-180, 180) to represent starboard/port slip.
    /// </summary>
    public static double CalculateLeeway(double cog, double hdg)
    {
        double beta = (cog - hdg) % 360.0;
        if (beta > 180.0) beta -= 360.0;
        if (beta <= -180.0) beta += 360.0;
        return beta;
    }

    /// <summary>
    /// Calculates the relative east velocity vector.
    /// </summary>
    public static double CalculateRelativeVelocityEast(double vEastTarget, double vEastOwn)
    {
        return vEastTarget - vEastOwn;
    }

    /// <summary>
    /// Calculates the relative north velocity vector.
    /// </summary>
    public static double CalculateRelativeVelocityNorth(double vNorthTarget, double vNorthOwn)
    {
        return vNorthTarget - vNorthOwn;
    }

    /// <summary>
    /// Calculates the final relative speed (magnitude of the relative velocity vector).
    /// </summary>
    public static double CalculateRelativeSpeed(double relVe, double relVn)
    {
        return Math.Sqrt((relVe * relVe) + (relVn * relVn));
    }

    /// <summary>
    /// Calculates the relative course based on the relative X/Y velocity vectors.
    /// Returns normalized heading 0-360.
    /// </summary>
    public static double CalculateRelativeCourse(double relVe, double relVn)
    {
        double relCourse = Math.Atan2(relVe, relVn) * RadToDeg;
        relCourse = relCourse % 360.0;
        if (relCourse < 0)
        {
            relCourse += 360.0;
        }
        return relCourse;
    }
}
